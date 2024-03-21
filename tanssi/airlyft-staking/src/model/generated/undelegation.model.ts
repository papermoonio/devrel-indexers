import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Account} from "./account.model"

@Entity_()
export class Undelegation {
    constructor(props?: Partial<Undelegation>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    account!: Account

    @Column_("int4", {nullable: false})
    blockNo!: number

    @Column_("text", {nullable: false})
    timestamp!: string

    @Column_("text", {nullable: false})
    candidate!: string
}
