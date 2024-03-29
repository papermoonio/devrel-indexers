import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {Delegation} from "./delegation.model"
import {DelegatorLeft} from "./delegatorLeft.model"

@Entity_()
export class Account {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    /**
     * Account address
     */
    @PrimaryColumn_()
    id!: string

    @OneToMany_(() => Delegation, e => e.account)
    delegations!: Delegation[]

    @OneToMany_(() => DelegatorLeft, e => e.account)
    delegatorLefts!: DelegatorLeft[]
}
