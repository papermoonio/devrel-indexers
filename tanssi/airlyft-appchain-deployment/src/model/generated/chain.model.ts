import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import {ParachainIdRegistration} from "./parachainIdRegistration.model"
import {RelayRegistration} from "./relayRegistration.model"

@Entity_()
export class Chain {
    constructor(props?: Partial<Chain>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string


}
