import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v9430 from '../v9430'

export const processed =  {
    name: 'MessageQueue.Processed',
    /**
     * Message is processed.
     */
    v9430: new EventType(
        'MessageQueue.Processed',
        sts.struct({
            id: sts.bytes(),
            origin: v9430.AggregateMessageOrigin,
            weightUsed: v9430.Weight,
            success: sts.boolean(),
        })
    ),
}
