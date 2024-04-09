import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v1502 from '../v1502'

export const orbiterRewarded =  {
    name: 'MoonbeamOrbiters.OrbiterRewarded',
    /**
     * Paid the orbiter account the balance as liquid rewards.
     */
    v1502: new EventType(
        'MoonbeamOrbiters.OrbiterRewarded',
        sts.struct({
            account: v1502.AccountId20,
            rewards: sts.bigint(),
        })
    ),
}
