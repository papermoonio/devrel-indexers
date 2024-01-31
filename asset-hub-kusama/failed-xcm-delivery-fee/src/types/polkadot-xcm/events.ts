import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v1 from '../v1'
import * as v4 from '../v4'
import * as v504 from '../v504'
import * as v700 from '../v700'
import * as v9382 from '../v9382'
import * as v1000000 from '../v1000000'

export const attempted =  {
    name: 'PolkadotXcm.Attempted',
    v1: new EventType(
        'PolkadotXcm.Attempted',
        v1.Outcome
    ),
    v4: new EventType(
        'PolkadotXcm.Attempted',
        v4.Outcome
    ),
    /**
     * Execution of an XCM message was attempted.
     * 
     * \[ outcome \]
     */
    v504: new EventType(
        'PolkadotXcm.Attempted',
        v504.V2Outcome
    ),
    /**
     * Execution of an XCM message was attempted.
     * 
     * \[ outcome \]
     */
    v700: new EventType(
        'PolkadotXcm.Attempted',
        v700.V2Outcome
    ),
    /**
     * Execution of an XCM message was attempted.
     * 
     * \[ outcome \]
     */
    v9382: new EventType(
        'PolkadotXcm.Attempted',
        v9382.V3Outcome
    ),
    /**
     * Execution of an XCM message was attempted.
     */
    v1000000: new EventType(
        'PolkadotXcm.Attempted',
        sts.struct({
            outcome: v1000000.V3Outcome,
        })
    ),
}
