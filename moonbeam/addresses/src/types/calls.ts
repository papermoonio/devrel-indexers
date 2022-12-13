import assert from 'assert'
import {Chain, ChainContext, CallContext, Call, Result, Option} from './support'
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
        return this._chain.getCallHash('Ethereum.transact') === '5428ddd9e500c37fab03733ba478898e4067902f2f5f71871a41c7242422fe10'
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
        return this._chain.getCallHash('Ethereum.transact') === '1415fd2e9fbe639b903297515a3d773224e43cd3e03aa9e6c3f0ae82fe4e93f4'
    }

    /**
     * Transact an Ethereum transaction.
     */
    get asV1201(): {transaction: v1201.TransactionV2} {
        assert(this.isV1201)
        return this._chain.decodeCall(this.call)
    }
}
