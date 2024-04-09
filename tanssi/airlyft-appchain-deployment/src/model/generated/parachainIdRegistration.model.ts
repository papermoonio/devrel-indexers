import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToOne as OneToOne_, Index as Index_, JoinColumn as JoinColumn_} from "typeorm"
import {Chain} from "./chain.model"

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

    @Index_({unique: true})
    @OneToOne_(() => Chain, {nullable: true})
    @JoinColumn_()
    paraId!: Chain

    @Column_("text", {nullable: false})
    sender!: string
}
