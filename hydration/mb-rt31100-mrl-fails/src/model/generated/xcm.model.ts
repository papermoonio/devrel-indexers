import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, IntColumn as IntColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class XCM {
    constructor(props?: Partial<XCM>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    hash!: string

    @StringColumn_({nullable: false})
    sender!: string

    @IntColumn_({nullable: false})
    dest!: number

    @StringColumn_({nullable: false})
    asset!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @IntColumn_({nullable: false})
    assetIDHDX!: number

    @StringColumn_({nullable: false})
    assetName!: string
}
