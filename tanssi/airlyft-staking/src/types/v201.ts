import {sts, Result, Option, Bytes, BitSequence} from './support'

export const TargetPool: sts.Type<TargetPool> = sts.closedEnum(() => {
    return  {
        AutoCompounding: sts.unit(),
        ManualRewards: sts.unit(),
    }
})

export type TargetPool = TargetPool_AutoCompounding | TargetPool_ManualRewards

export interface TargetPool_AutoCompounding {
    __kind: 'AutoCompounding'
}

export interface TargetPool_ManualRewards {
    __kind: 'ManualRewards'
}

export const AccountId32 = sts.bytes()
