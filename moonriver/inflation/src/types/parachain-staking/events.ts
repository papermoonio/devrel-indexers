import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v49 from '../v49'
import * as v1300 from '../v1300'

export const rewarded =  {
    name: 'ParachainStaking.Rewarded',
    /**
     *  Paid the account (nominator or collator) the balance as liquid rewards
     */
    v49: new EventType(
        'ParachainStaking.Rewarded',
        sts.tuple([v49.AccountId, v49.BalanceOf])
    ),
    /**
     * Paid the account (delegator or collator) the balance as liquid rewards.
     */
    v1300: new EventType(
        'ParachainStaking.Rewarded',
        sts.struct({
            account: v1300.AccountId20,
            rewards: sts.bigint(),
        })
    ),
}

export const reservedForParachainBond =  {
    name: 'ParachainStaking.ReservedForParachainBond',
    /**
     *  Transferred to account which holds funds reserved for parachain bond
     */
    v49: new EventType(
        'ParachainStaking.ReservedForParachainBond',
        sts.tuple([v49.AccountId, v49.BalanceOf])
    ),
    /**
     * Transferred to account which holds funds reserved for parachain bond.
     */
    v1300: new EventType(
        'ParachainStaking.ReservedForParachainBond',
        sts.struct({
            account: v1300.AccountId20,
            value: sts.bigint(),
        })
    ),
}
