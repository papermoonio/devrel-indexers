import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class AppchainActivity {
    constructor(props?: Partial<AppchainActivity>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @IntColumn_({nullable: false})
    paraId!: number

    @StringColumn_({nullable: false})
    sender!: string

    @IntColumn_({nullable: false})
    registrationBlockNumber!: number

    @StringColumn_({nullable: false})
    registrationTimestamp!: string

    @IntColumn_({nullable: true})
    launchBlockNumber!: number | undefined | null

    @StringColumn_({nullable: true})
    launchTimestamp!: string | undefined | null

    @IntColumn_({nullable: true})
    decommissionBlockNumber!: number | undefined | null

    @StringColumn_({nullable: true})
    decommissionTimestamp!: string | undefined | null
}
