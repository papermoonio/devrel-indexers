import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v9010 from '../v9010'
import * as v9100 from '../v9100'
import * as v9111 from '../v9111'
import * as v9160 from '../v9160'
import * as v9381 from '../v9381'
import * as v1000000 from '../v1000000'

export const attempted =  {
    name: 'XcmPallet.Attempted',
    v9010: new EventType(
        'XcmPallet.Attempted',
        v9010.Outcome
    ),
    v9100: new EventType(
        'XcmPallet.Attempted',
        v9100.Outcome
    ),
    /**
     * Execution of an XCM message was attempted.
     * 
     * \[ outcome \]
     */
    v9111: new EventType(
        'XcmPallet.Attempted',
        v9111.V2Outcome
    ),
    /**
     * Execution of an XCM message was attempted.
     * 
     * \[ outcome \]
     */
    v9160: new EventType(
        'XcmPallet.Attempted',
        v9160.V2Outcome
    ),
    /**
     * Execution of an XCM message was attempted.
     * 
     * \[ outcome \]
     */
    v9381: new EventType(
        'XcmPallet.Attempted',
        v9381.V3Outcome
    ),
    /**
     * Execution of an XCM message was attempted.
     */
    v1000000: new EventType(
        'XcmPallet.Attempted',
        sts.struct({
            outcome: v1000000.V3Outcome,
        })
    ),
}
