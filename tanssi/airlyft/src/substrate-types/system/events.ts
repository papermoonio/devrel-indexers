import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v200 from '../v200'

export const extrinsicSuccess =  {
    name: 'System.ExtrinsicSuccess',
    /**
     * An extrinsic completed successfully.
     */
    v200: new EventType(
        'System.ExtrinsicSuccess',
        sts.struct({
            dispatchInfo: v200.DispatchInfo,
        })
    ),
}

export const extrinsicFailed =  {
    name: 'System.ExtrinsicFailed',
    /**
     * An extrinsic failed.
     */
    v200: new EventType(
        'System.ExtrinsicFailed',
        sts.struct({
            dispatchError: v200.DispatchError,
            dispatchInfo: v200.DispatchInfo,
        })
    ),
}
