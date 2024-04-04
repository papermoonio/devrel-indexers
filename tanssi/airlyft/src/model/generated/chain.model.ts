import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Transaction} from "./transaction.model"
import {Address} from "./address.model"

@Entity_()
export class Chain {
    constructor(props?: Partial<Chain>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @OneToMany_(() => Transaction, e => e.chain)
    transactions!: Transaction[]

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalTransactions!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalContractCalls!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalContractsCreated!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalGasUsed!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    uniqueAddressesCount!: bigint

    @OneToMany_(() => Address, e => e.chain)
    addresses!: Address[]
}
