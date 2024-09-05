import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v108 from '../v108'
import * as v115 from '../v115'

export const xcmpMessageSent =  {
    name: 'XcmpQueue.XcmpMessageSent',
    /**
     * An HRMP message was sent to a sibling parachain.
     */
    v108: new EventType(
        'XcmpQueue.XcmpMessageSent',
        sts.option(() => v108.H256)
    ),
    /**
     * An HRMP message was sent to a sibling parachain.
     */
    v115: new EventType(
        'XcmpQueue.XcmpMessageSent',
        sts.struct({
            messageHash: sts.option(() => v115.H256),
        })
    ),
    /**
     * An HRMP message was sent to a sibling parachain.
     */
    v205: new EventType(
        'XcmpQueue.XcmpMessageSent',
        sts.struct({
            messageHash: sts.bytes(),
        })
    ),
}
