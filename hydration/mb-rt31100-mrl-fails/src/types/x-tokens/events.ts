import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v244 from '../v244'

export const transferredAssets =  {
    name: 'XTokens.TransferredAssets',
    /**
     * Transferred `Asset` with fee.
     */
    v244: new EventType(
        'XTokens.TransferredAssets',
        sts.struct({
            sender: v244.AccountId32,
            assets: sts.array(() => v244.V4Asset),
            fee: v244.V4Asset,
            dest: v244.V4Location,
        })
    ),
}
