import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class Address {
  constructor(props?: Partial<Address>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  timestamp!: string

  @Column_("text", {nullable: false})
  blockNo!: string

  @Column_("text", {nullable: false})
  accountId!: string
}
