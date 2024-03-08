import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v100 from '../v100'

export const transact =  {
    name: 'Ethereum.transact',
    /**
     * Transact an Ethereum transaction.
     */
    v100: new CallType(
        'Ethereum.transact',
        sts.struct({
            transaction: v100.TransactionV2,
        })
    ),
}
