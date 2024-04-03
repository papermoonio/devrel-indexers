import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v100 from '../v100'

export const extrinsicSuccess =  {
    name: 'System.ExtrinsicSuccess',
    /**
     * An extrinsic completed successfully.
     */
    v100: new EventType(
        'System.ExtrinsicSuccess',
        sts.struct({
            dispatchInfo: v100.DispatchInfo,
        })
    ),
}

export const extrinsicFailed =  {
    name: 'System.ExtrinsicFailed',
    /**
     * An extrinsic failed.
     */
    v100: new EventType(
        'System.ExtrinsicFailed',
        sts.struct({
            dispatchError: v100.DispatchError,
            dispatchInfo: v100.DispatchInfo,
        })
    ),
}

export const newAccount =  {
    name: 'System.NewAccount',
    /**
     * A new account was created.
     */
    v100: new EventType(
        'System.NewAccount',
        sts.struct({
            account: v100.AccountId20,
        })
    ),
}
