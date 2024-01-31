import {sts, Result, Option, Bytes, BitSequence} from './support'

export const NominatorAdded: sts.Type<NominatorAdded> = sts.closedEnum(() => {
    return  {
        AddedToBottom: sts.unit(),
        AddedToTop: Balance,
    }
})

export const Balance = sts.bigint()

export type NominatorAdded = NominatorAdded_AddedToBottom | NominatorAdded_AddedToTop

export interface NominatorAdded_AddedToBottom {
    __kind: 'AddedToBottom'
}

export interface NominatorAdded_AddedToTop {
    __kind: 'AddedToTop'
    value: Balance
}

export type Balance = bigint

export const BalanceOf = sts.bigint()

export const AccountId = sts.bytes()
