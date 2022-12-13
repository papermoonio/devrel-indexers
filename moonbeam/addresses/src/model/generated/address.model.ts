import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Address {
  constructor(props?: Partial<Address>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  timestamp!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  blockNo!: bigint

  @Column_("text", {nullable: false})
  accountId!: string
}
