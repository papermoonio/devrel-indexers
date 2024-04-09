import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v49 from '../v49'

export const deposit =  {
    name: 'Treasury.Deposit',
    /**
     *  Some funds have been deposited. \[deposit\]
     */
    v49: new EventType(
        'Treasury.Deposit',
        v49.Balance
    ),
    /**
     * Some funds have been deposited.
     */
    v1300: new EventType(
        'Treasury.Deposit',
        sts.struct({
            value: sts.bigint(),
        })
    ),
}
