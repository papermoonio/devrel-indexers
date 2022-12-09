# Inflation-related Indexers

This directory contains a [Subsquid](https://docs.subsquid.io/) indexers for Moonbeam.

The indexer retrieves the following data:

✅ `ParachainStaking.Rewarded` events for collator and delegator reward payouts

✅ `ParachainStaking.ReservedForParachainBond` events for transfers to the parachain bond reserve

✅ `Treasury.Deposit` events for determining the burned fees

Please note that in the future the method for using `Treasury.Deposit` events to calculate burned fees has the potential to **not** be totally accurate. If a treasury propoal gets rejected, the deposit for the proposal is sent to the treasury and a `Treasury.Deposit` event will be emitted and as a result this will impact the burned fees calculation. 

## Get Started

To get started, you can take the following steps from the  `inflation` directory:

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

    To access the GraphQL playground, navigate to [localhost:4350/graphql](http://localhost:4350/graphql) for Moonbeam.


When you start to see the terminal output similar logs to the following, you'll know that your indexer has begun syncing blocks:

```
23:31:39 INFO  sqd:processor 89400 / 2357119, rate: 17114 blocks/sec, mapping: 17 blocks/sec, 466 items/sec, ingest: 87 blocks/sec, eta: 3m
23:31:43 INFO  sqd:processor 172204 / 2357120, rate: 20291 blocks/sec, mapping: 18 blocks/sec, 578 items/sec, ingest: 76 blocks/sec, eta: 2m
23:31:45 INFO  sqd:processor 174006 / 2357120, rate: 15830 blocks/sec, mapping: 19 blocks/sec, 411 items/sec, ingest: 82 blocks/sec, eta: 3m
23:31:48 INFO  sqd:processor 175808 / 2357120, rate: 13015 blocks/sec, mapping: 19 blocks/sec, 335 items/sec, ingest: 84 blocks/sec, eta: 3m
```

## Ports

The default ports for Moonbeam are as follows:

- DB_PORT=23798
- PROCESSOR_PROMETHEUS_PORT=3000
- GQL_PORT=4350

# Post-Processing Scripts

You can find scripts to process the indexed data in the root `scripts` directory. There are three scripts:

- `inflation-parachain-bond-reserve.js` - provides data for inflation to the parachain bond reserve
- `inflation-staking.js` - provides data for inflation to staking (collators & delegators)
- `net-inflation.js` - provides data for net inflation
- `gross-inflation.js` - provides data for gross inflation (sum of parachain bond reserve & staking related inflation)
- `burned-fees.js` - provides data for the burned fees

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
