# Address Indexers

This directory contains a [Subsquid](https://docs.subsquid.io/) indexer for Moonbeam.

The indexer retrieves the following data:

✅ `Ethereum.Transact` calls to determine in the action of a transaction is `create`, indicating a contract creation

✅ `System.NewAccounts` events to retrieve all of the new addresses created

Please note, there was a bug with `System.NewAccounts` events where this event was not emitted at time of creation so a hotfix was applied and the missed events were emitted across a few blocks on [Moonbeam](https://moonbeam.subscan.io/extrinsic?module=evm&call=hotfix_inc_account_sufficients) and [Moonriver](https://moonriver.subscan.io/extrinsic?module=evm&call=hotfix_inc_account_sufficients).


## Get Started

To get started, you can take the following steps from the  `addresses` directory:

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
