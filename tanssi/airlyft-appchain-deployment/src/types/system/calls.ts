import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'

export const remark =  {
    name: 'System.remark',
    /**
     * Make some on-chain remark.
     * 
     * - `O(1)`
     */
    v101: new CallType(
        'System.remark',
        sts.struct({
            remark: sts.bytes(),
        })
    ),
}
