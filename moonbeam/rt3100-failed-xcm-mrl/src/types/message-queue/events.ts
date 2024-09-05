import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v2901 from '../v2901'

export const processed =  {
    name: 'MessageQueue.Processed',
    /**
     * Message is processed.
     */
    v2901: new EventType(
        'MessageQueue.Processed',
        sts.struct({
            /**
             * The `blake2_256` hash of the message.
             */
            id: v2901.H256,
            /**
             * The queue of the message.
             */
            origin: v2901.AggregateMessageOrigin,
            /**
             * How much weight was used to process the message.
             */
            weightUsed: v2901.Weight,
            /**
             * Whether the message was processed.
             * 
             * Note that this does not mean that the underlying `MessageProcessor` was internally
             * successful. It *solely* means that the MQ pallet will treat this as a success
             * condition and discard the message. Any internal error needs to be emitted as events
             * by the `MessageProcessor`.
             */
            success: sts.boolean(),
        })
    ),
}
