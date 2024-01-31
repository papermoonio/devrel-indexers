const axios = require('axios');
const fs = require('fs');

const graphqlEndpoint = 'http://localhost:4350/graphql'; // Update with your GraphQL endpoint

const query = `
query MyQuery {
  transfers {
    blockNumber
    amount
    from
    id
    to
    assetID
  }
}
`;

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
    const transfers = response.data.data.transfers;

    const jsonData = JSON.stringify(transfers);

    const filePath = 'output.json';

    fs.writeFileSync(filePath, jsonData);

    console.log(`JSON array has been stored in ${filePath}`);
  })
  .catch((error) => {
    console.error('GraphQL Error:', error);
  });
