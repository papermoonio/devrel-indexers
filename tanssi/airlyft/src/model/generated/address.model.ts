import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Chain} from "./chain.model"
import {Transaction} from "./transaction.model"

@Entity_()
export class Address {
    constructor(props?: Partial<Address>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: false})
    address!: string

    @Index_()
    @ManyToOne_(() => Chain, {nullable: true})
    chain!: Chain

    @Column_("bool", {nullable: false})
    isContract!: boolean

    @OneToMany_(() => Transaction, e => e.sender)
    transactionsSent!: Transaction[]

    @OneToMany_(() => Transaction, e => e.receiver)
    transactionsReceived!: Transaction[]

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalTransactions!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalContractCalls!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalContractsCreated!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalGasUsed!: bigint
}
