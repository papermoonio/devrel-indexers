import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class ParachainIdRegistration {
    constructor(props?: Partial<ParachainIdRegistration>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("int4", {nullable: false})
    blockNo!: number

    @Column_("text", {nullable: false})
    timestamp!: string

    @Column_("int4", {nullable: false})
    paraId!: number

    @Column_("text", {nullable: false})
    sender!: string
}
