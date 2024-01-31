import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v49 from '../v49'
import * as v53 from '../v53'
import * as v900 from '../v900'
import * as v1001 from '../v1001'
import * as v1300 from '../v1300'
import * as v1901 from '../v1901'

export const nominatorLeft =  {
    name: 'ParachainStaking.NominatorLeft',
    /**
     *  Nominator, Amount Unstaked
     */
    v49: new EventType(
        'ParachainStaking.NominatorLeft',
        sts.tuple([v49.AccountId, v49.BalanceOf])
    ),
}

export const nomination =  {
    name: 'ParachainStaking.Nomination',
    /**
     *  Nominator, Amount Locked, Collator, New Total Amt backing Collator
     */
    v49: new EventType(
        'ParachainStaking.Nomination',
        sts.tuple([v49.AccountId, v49.BalanceOf, v49.AccountId, v49.BalanceOf])
    ),
    /**
     *  Nominator, Amount Locked, Collator, Nominator Position with New Total Backing if in Top
     */
    v53: new EventType(
        'ParachainStaking.Nomination',
        sts.tuple([v53.AccountId, v53.BalanceOf, v53.AccountId, v53.NominatorAdded])
    ),
    /**
     * Nominator, Amount Locked, Collator, Nominator Position with New Total Counted if in Top
     */
    v900: new EventType(
        'ParachainStaking.Nomination',
        sts.tuple([v900.H160, sts.bigint(), v900.H160, v900.NominatorAdded])
    ),
}

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
