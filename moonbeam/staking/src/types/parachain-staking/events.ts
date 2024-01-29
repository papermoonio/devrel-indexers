import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v1001 from '../v1001'
import * as v1300 from '../v1300'
import * as v1901 from '../v1901'

export const delegatorLeft =  {
    name: 'ParachainStaking.DelegatorLeft',
    /**
     * Delegator, Amount Unstaked
     */
    v1001: new EventType(
        'ParachainStaking.DelegatorLeft',
        sts.tuple([v1001.AccountId20, sts.bigint()])
    ),
    /**
     * Delegator has left the set of delegators.
     */
    v1300: new EventType(
        'ParachainStaking.DelegatorLeft',
        sts.struct({
            delegator: v1300.AccountId20,
            unstakedAmount: sts.bigint(),
        })
    ),
}

export const delegation =  {
    name: 'ParachainStaking.Delegation',
    /**
     * Delegator, Amount Locked, Candidate, Delegator Position with New Total Counted if in Top
     */
    v1001: new EventType(
        'ParachainStaking.Delegation',
        sts.tuple([v1001.AccountId20, sts.bigint(), v1001.AccountId20, v1001.DelegatorAdded])
    ),
    /**
     * New delegation (increase of the existing one).
     */
    v1300: new EventType(
        'ParachainStaking.Delegation',
        sts.struct({
            delegator: v1300.AccountId20,
            lockedAmount: sts.bigint(),
            candidate: v1300.AccountId20,
            delegatorPosition: v1300.DelegatorAdded,
        })
    ),
    /**
     * New delegation (increase of the existing one).
     */
    v1901: new EventType(
        'ParachainStaking.Delegation',
        sts.struct({
            delegator: v1901.AccountId20,
            lockedAmount: sts.bigint(),
            candidate: v1901.AccountId20,
            delegatorPosition: v1901.DelegatorAdded,
            autoCompound: v1901.Percent,
        })
    ),
}
