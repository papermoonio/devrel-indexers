const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const graphqlEndpoint = 'http://localhost:4350/graphql'; // Update with your GraphQL endpoint

const query = `
  query MyQuery {
    accounts {
      id
      delegations {
        blockNum
      }
      delegatorLefts {
        blockNum
      }
    }
  }
`;

const fromBlock = 2702911; // BOD Jan 11, 2023
const toBlock = 5273761; // EOD Jan 10, 2023

axios
  .post(
    graphqlEndpoint,
    { query },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  .then((response) => {
    const accounts = response.data.data.accounts;

    accounts.forEach((account) => {
      let totalBlocks = 0;
      let startBlock = 0;

      // Change the delegations and delegatorLefts arrays to be
      // [BLOCK_1, BLOCK_2] instead of [{ "blockNum": BLOCK_1 }, { "blockNum": BLOCK_2 }]
      const delegationBlocks = account.delegations.map(
        (delegation) => delegation.blockNum
      );
      const delegatorLefts = account.delegatorLefts.map(
        (left) => left.blockNum
      );

      // NEVER STOPPED DELEGATING: ✅
      // If a delegator has never left the pool and has no block numbers in the delegatorLefts array,
      // we need to find the first block that they delegated. If the first block is prior to the
      // fromBlock, we can substract toBlock - fromBlock to get all of the blocks for the entire year.
      // If the first block is after the fromBlock, we can substract toBlock - startBlock to get all of
      // the blocks they were staking for this year
      if (delegatorLefts.length == 0) {
        startBlock = delegationBlocks[0];
        if (startBlock <= fromBlock) {
          totalBlocks = toBlock - fromBlock;
        } else {
          totalBlocks = toBlock - startBlock;
        }

        saveToCSV([{ accountId: account.id, totalBlocks }]);
        return;
      }

      // STOPPED DELEGATING PRIOR TO JAN 11 2023: ✅
      // Next, we can check to see if the account has left the delegation pool prior to fromBlock
      // and have not rejoined since. In this case, we don't need to do anything with their data.
      // To do this, let's get their last delegation block and last delegator block
      const lastDelBlock = delegationBlocks[delegationBlocks.length - 1];
      const lastLeftBlock = delegatorLefts[delegatorLefts.length - 1];
      if (lastLeftBlock < fromBlock && lastDelBlock < fromBlock) {
        // All of their delegating activities were prior to the fromBlock, so we don't need to do
        // anything.
        return;
      }

      // PROCESS DATA IN DELEGATE, LEAVE, DELEGATE, LEAVE PATTERN: ✅
      // Things will get tricky, so let's handle the easy cases first.
      // If the account has an equal amount of delegations and delegatorLefts, that means
      // they've followed a delegate, leave, delegate, leave, etc. pattern. So, with that in mind
      // we can iterate over each event and if it falls within our window, count the blocks.
      if (delegationBlocks.length == delegatorLefts.length) {
        if (lastLeftBlock < fromBlock) {
          return;
        } else {
          for (var i = 0; i < delegationBlocks.length; i++) {
            if (delegatorLefts[i] <= fromBlock) {
              // Do nothing
              continue;
            } else if (delegatorLefts[i] <= toBlock) {
              // Use the block they left in calculations
              if (delegationBlocks[i] <= fromBlock) {
                // Use the fromBlock in calculations
                totalBlocks += delegatorLefts[i] - fromBlock;
              } else {
                // Use the block they delegated in calculations
                totalBlocks += delegatorLefts[i] - delegationBlocks[i];
              }
            } else if (delegatorLefts[i] > toBlock) {
              // Use the toBlock in calculations
              if (delegationBlocks[i] <= fromBlock) {
                // Use the fromBlock in calculations
                totalBlocks += toBlock - fromBlock;
              } else {
                // Use the block they delegated in calculations
                totalBlocks += toBlock - delegationBlocks[i]
              }
            }
          }

          saveToCSV([{ accountId: account.id, totalBlocks }]);
          return;
        }
      }

      // FILTER OUT EXTRA "DELEGATIONS", SO WE HAVE A DELEGATE, LEAVE, DELEGATE, LEAVE PATTERN ✅
      // Now for the mismatches where there may be more delegations than delegatorLefts. So let's
      // try to match them up. We'll want to grab the lowest delegation block and "match" it to the
      // next closest delegator left block, but the delegator left block must be greater.
      if (delegationBlocks.length > delegatorLefts.length) {
        const delegationBlocksCopy = [...delegationBlocks];
        let newArray = [];
        delegatorLefts.forEach(leave => {
          const blocksLessThanLeave = delegationBlocksCopy.filter(value => value < leave);
          newArray.push(blocksLessThanLeave[0]);
          blocksLessThanLeave.forEach(block => {
            const index = delegationBlocksCopy.indexOf(block);
            if (index !== -1) {
              delegationBlocksCopy.splice(index, 1);
            }
          })
        })

        // If there are left over delegations, that means they haven't left the delegator pool yet.
        // They can have more than one delegation, so just take the first one as that is the first time
        // they've reentered the pool after last leaving
        if (delegationBlocksCopy.length > 0) {
          newArray.push(delegationBlocksCopy[0]);
        }

        if (newArray.length > delegatorLefts.length) {
          // Add the toBlock to the delegatorLefts array
          delegatorLefts.push(toBlock);
        }
        
        // PROCESS DATA IN DELEGATE, LEAVE, DELEGATE, LEAVE PATTERN: ✅
        if (newArray.length == delegatorLefts.length) {
          if (lastLeftBlock < fromBlock) {
            return;
          } else {
            for (var i = 0; i < newArray.length; i++) {
              if (delegatorLefts[i] <= fromBlock) {
                // Do nothing
                continue;
              } else if (delegatorLefts[i] <= toBlock) {
                // Use the block they left in calculations
                if (newArray[i] <= fromBlock) {
                  // Use the fromBlock in calculations
                  totalBlocks += delegatorLefts[i] - fromBlock;
                } else {
                  // Use the block they delegated in calculations
                  totalBlocks += delegatorLefts[i] - newArray[i];
                }
              } else if (delegatorLefts[i] > toBlock) {
                // Use the toBlock in calculations
                if (newArray[i] <= fromBlock) {
                  // Use the fromBlock in calculations
                  totalBlocks += toBlock - fromBlock;
                } else {
                  // Use the block they delegated in calculations
                  totalBlocks += toBlock - newArray[i]
                }
              }
            }
  
            saveToCSV([{ accountId: account.id, totalBlocks }]);
            return;
          }
        }
      }
    });
  })
  .catch((error) => {
    console.error('GraphQL Error:', error);
  });

function saveToCSV(data) {
  const csvWriter = createCsvWriter({
    path: 'output.csv',
    header: [
      { id: 'accountId', title: 'Account ID' },
      { id: 'totalBlocks', title: 'Total Blocks' },
    ],
    append: true,
  });

  csvWriter
    .writeRecords(data)
    .then(() => console.log('CSV file has been written successfully.'));
}
