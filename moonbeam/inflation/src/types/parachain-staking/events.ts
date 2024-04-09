import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v900 from '../v900'
import * as v1300 from '../v1300'

export const rewarded =  {
    name: 'ParachainStaking.Rewarded',
    /**
     * Paid the account (nominator or collator) the balance as liquid rewards
     */
    v900: new EventType(
        'ParachainStaking.Rewarded',
        sts.tuple([v900.H160, sts.bigint()])
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
     * Transferred to account which holds funds reserved for parachain bond
     */
    v900: new EventType(
        'ParachainStaking.ReservedForParachainBond',
        sts.tuple([v900.H160, sts.bigint()])
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
