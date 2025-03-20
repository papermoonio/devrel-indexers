import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class StakingReward {
    constructor(props?: Partial<StakingReward>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({nullable: false})
    balance!: bigint

    @BigIntColumn_({nullable: true})
    timestamp!: bigint | undefined | null

    @StringColumn_({nullable: false})
    account!: string
}
