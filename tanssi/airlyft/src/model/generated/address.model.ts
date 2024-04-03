import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {AddressChainConnection} from "./addressChainConnection.model"

@Entity_()
export class Address {
    constructor(props?: Partial<Address>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @OneToMany_(() => AddressChainConnection, e => e.address)
    chains!: AddressChainConnection[]
}
