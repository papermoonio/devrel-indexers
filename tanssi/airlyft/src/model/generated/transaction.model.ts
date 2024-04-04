import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Chain} from "./chain.model"
import {Address} from "./address.model"
import {TransactionType} from "./_transactionType"

@Entity_()
export class Transaction {
    constructor(props?: Partial<Transaction>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Chain, {nullable: true})
    chain!: Chain

    @Column_("int4", {nullable: false})
    blockNo!: number

    @Column_("text", {nullable: false})
    timestamp!: string

    @Column_("bool", {nullable: false})
    isEvm!: boolean

    @Column_("text", {nullable: false})
    hash!: string

    @Index_()
    @ManyToOne_(() => Address, {nullable: true})
    sender!: Address

    @Index_()
    @ManyToOne_(() => Address, {nullable: true})
    receiver!: Address | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    gasUsed!: bigint

    @Column_("varchar", {length: 17, nullable: true})
    type!: TransactionType | undefined | null
}
