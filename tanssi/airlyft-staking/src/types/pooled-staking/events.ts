import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v201 from '../v201'

export const executedDelegate =  {
    name: 'PooledStaking.ExecutedDelegate',
    /**
     * Delegation request was executed. `staked` has been properly staked
     * in `pool`, while the rounding when converting to shares has been
     * `released`.
     */
    v201: new EventType(
        'PooledStaking.ExecutedDelegate',
        sts.struct({
            candidate: v201.AccountId32,
            delegator: v201.AccountId32,
            pool: v201.TargetPool,
            staked: sts.bigint(),
            released: sts.bigint(),
        })
    ),
}
