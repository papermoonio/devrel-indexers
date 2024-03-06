import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Transaction {
    constructor(props?: Partial<Transaction>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("int4", {nullable: false})
    blockNo!: number

    @Column_("bool", {nullable: false})
    evm!: boolean

    @Column_("bool", {nullable: false})
    isSuccess!: boolean

    @Column_("text", {nullable: true})
    hash!: string | undefined | null

    @Column_("text", {nullable: true})
    sender!: string | undefined | null

    @Column_("text", {nullable: true})
    receiver!: string | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    gasUsed!: bigint | undefined | null

    @Column_("text", {nullable: true})
    type!: string | undefined | null
}
