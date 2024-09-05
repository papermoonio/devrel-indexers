import {sts, Result, Option, Bytes, BitSequence} from './support'

export const Weight: sts.Type<Weight> = sts.struct(() => {
    return  {
        refTime: sts.bigint(),
        proofSize: sts.bigint(),
    }
})

export interface Weight {
    refTime: bigint
    proofSize: bigint
}

export const AggregateMessageOrigin: sts.Type<AggregateMessageOrigin> = sts.closedEnum(() => {
    return  {
        Here: sts.unit(),
        Parent: sts.unit(),
        Sibling: Id,
    }
})

export const Id = sts.number()

export type AggregateMessageOrigin = AggregateMessageOrigin_Here | AggregateMessageOrigin_Parent | AggregateMessageOrigin_Sibling

export interface AggregateMessageOrigin_Here {
    __kind: 'Here'
}

export interface AggregateMessageOrigin_Parent {
    __kind: 'Parent'
}

export interface AggregateMessageOrigin_Sibling {
    __kind: 'Sibling'
    value: Id
}

export type Id = number

export const H256 = sts.bytes()
