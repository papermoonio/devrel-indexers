import assert from 'assert'
import {Chain, ChainContext, CallContext, Call, Result} from './support'
import * as v900 from './v900'
import * as v1201 from './v1201'

export class EthereumTransactCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Ethereum.transact')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   * Transact an Ethereum transaction.
   */
  get isV900(): boolean {
    return this._chain.getCallHash('Ethereum.transact') === '27ed559a6856e5085900eccf20290c958992ff554f041fdc4516e405fc8ddb97'
  }

  /**
   * Transact an Ethereum transaction.
   */
  get asV900(): {transaction: v900.LegacyTransaction} {
    assert(this.isV900)
    return this._chain.decodeCall(this.call)
  }

  /**
   * Transact an Ethereum transaction.
   */
  get isV1201(): boolean {
    return this._chain.getCallHash('Ethereum.transact') === '141b9fbf21429ca5123d8cd59859311499b6d8eb06fdd0a71b9b4b097e14a234'
  }

  /**
   * Transact an Ethereum transaction.
   */
  get asV1201(): {transaction: v1201.TransactionV2} {
    assert(this.isV1201)
    return this._chain.decodeCall(this.call)
  }
}
