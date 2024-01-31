import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v1 from '../v1'
import * as v700 from '../v700'

export const transferred =  {
    name: 'Assets.Transferred',
    /**
     *  Some assets were transferred. \[asset_id, from, to, amount\]
     */
    v1: new EventType(
        'Assets.Transferred',
        sts.tuple([v1.AssetId, v1.AccountId, v1.AccountId, v1.TAssetBalance])
    ),
    /**
     * Some assets were transferred.
     */
    v700: new EventType(
        'Assets.Transferred',
        sts.struct({
            assetId: sts.number(),
            from: v700.AccountId32,
            to: v700.AccountId32,
            amount: sts.bigint(),
        })
    ),
}
