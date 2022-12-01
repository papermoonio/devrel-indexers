# Inflation-related Indexers

This repo contains two [Subsquid](https://docs.subsquid.io/) indexers: one for Moonbeam and one for Moonriver.

Both indexers retrieve the following data:

✅ `ParachainStaking.Rewarded` events for collator and delegator reward payouts

✅ `ParachainStaking.ReservedForParachainBond` events for transfers to the parachain bond reserve

✅ `Treasury.Deposit` events for determining the burned fees

Please note that in the future the method for using `Treasury.Deposit` events to calculate burned fees has the potential to **not** be totally accurate. If a treasury propoal gets rejected, the deposit for the proposal is sent to the treasury and a `Treasury.Deposit` event will be emitted and as a result this will impact the burned fees calculation. 

## Get Started

Currently, this repo is set up so you can run one or the other at a time. If you wish to run both, you'll need to spin up the indexer in both the `moonriver` and `moonbeam` directories.

To get started, you can take the following steps from the `moonriver` or `moonbeam` directory:

- Install the dependencies:

    ```
    npm install
    ```

- Build the code:

    ```
    make build
    ```

- Launch the PostgreSQL container:

    ```
    make up
    ```

- Generate the migrations:

    ```
    make generate-migrations
    ```

- Run the processor:

    ```
    make process
    ```

- Launch the GraphQL server

    ```
    make serve
    ```

    To access the GraphQL playground, navigate to [localhost:4350/graphql](http://localhost:4350/graphql) for Moonbeam and [localhost:4351/graphql](http://localhost:4351/graphql) for Moonriver.


When you start to see the terminal output similar logs to the following, you'll know that your indexer has begun syncing blocks:

```
23:31:39 INFO  sqd:processor 89400 / 2357119, rate: 17114 blocks/sec, mapping: 17 blocks/sec, 466 items/sec, ingest: 87 blocks/sec, eta: 3m
23:31:43 INFO  sqd:processor 172204 / 2357120, rate: 20291 blocks/sec, mapping: 18 blocks/sec, 578 items/sec, ingest: 76 blocks/sec, eta: 2m
23:31:45 INFO  sqd:processor 174006 / 2357120, rate: 15830 blocks/sec, mapping: 19 blocks/sec, 411 items/sec, ingest: 82 blocks/sec, eta: 3m
23:31:48 INFO  sqd:processor 175808 / 2357120, rate: 13015 blocks/sec, mapping: 19 blocks/sec, 335 items/sec, ingest: 84 blocks/sec, eta: 3m
```

## Tips for Speeding up the Indexing Process

If you're familiar with Fire Squid 🔥🦑, you know how fast of an indexer it can be. Unfortunately, due to the heavy nature of the requests being made in these squids, it will take longer than normal to index all of the blocks. Increasing the batch size can result in 500 errors due to request timeouts, but you're welcome to try updating it! To do so, you can update the `.setBatchSize(<insert-batch-size)` configuration in the `moon*/processor.ts` file. Just make sure you run `make build` before you resume syncing. 

You can also set the block range, which will also speed up your time with the indexer. You can make changes in the `moon*/src/processor.ts` file and add the `.setBlockRange({ from: <insert>, to: <insert> })` config.

## Apply Changes

If you've made changes to the `schema.graphql` file, you'll need to run:

```
make codegen
```

If you've made changes to the `typegen.json` file, you'll need to run:

```
make typegen
```

If you've made changes to any of the typescript files such as the `processor.ts` file, you can build your changes:

```
make build
```

## Ports

The default ports for Moonbeam are as follows:

- DB_PORT=23798
- PROCESSOR_PROMETHEUS_PORT=3000
- GQL_PORT=4350

The default ports for Moonriver are as follows:

- DB_PORT=23799
- PROCESSOR_PROMETHEUS_PORT=3001
- GQL_PORT=4351

## Common Errors

It is commmon to receive an occassional `Error: Got http 500` error. You'll just need to restart the processor using the `make process` command. 

If you consistently receive the error, it is possible that the batch size is too large. To fix this issue, you'll need to open the `processor.ts` file and change the argurment for `setBatchSize`. To apply the changes, you'll need to rebuild the code using the `make build` command and then restart the processor using the `make process` command.

# Post-Processing Scripts

You can find scripts to process the indexed data in the `scripts` directory. There are three scripts:

- `inflation-parachain-bond-reserve.js` - provides data for inflation to the parachain bond reserve
- `inflation-staking.js` - provides data for inflation to staking (collators & delegators)
- `net-inflation.js` - provides data for net inflation

To run the script, you can pass the following arguments:

- `-i` - *required* Interval to group data by (daily, monthly, total)
- `-n` - *required* Network (moonbeam, moonriver)
- `-s` - *required if using `daily` or `monthly` intervals* Start date for the data (i.e., 2022-01-01)
- `-e` - *required if using `daily` or `monthly` intervals* End date for the data (i.e., 2022-12-31)

Example usage:

```s
node scripts/net-inflation.js -i daily -n moonbeam -s 2022-01-01 -e 2022-12-31
```

The results of running the scripts can be found in the `csv-files` directory and the files are named to match each script. So, if you run the `net-inflation.js` script, you'll find the `<network>-<interval>-net-inflation.csv` file there.
