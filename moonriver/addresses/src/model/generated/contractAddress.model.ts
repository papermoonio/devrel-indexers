import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class ContractAddress {
  constructor(props?: Partial<ContractAddress>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  timestamp!: string

  @Column_("text", {nullable: false})
  blockNo!: string
}
