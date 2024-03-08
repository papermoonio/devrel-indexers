import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v100 from '../v100'

export const executed =  {
    name: 'Ethereum.Executed',
    /**
     * An ethereum transaction was successfully executed.
     */
    v100: new EventType(
        'Ethereum.Executed',
        sts.struct({
            from: v100.H160,
            to: v100.H160,
            transactionHash: v100.H256,
            exitReason: v100.ExitReason,
            extraData: sts.bytes(),
        })
    ),
}
