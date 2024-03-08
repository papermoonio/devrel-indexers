import {sts, Result, Option, Bytes, BitSequence} from './support'

export const TransactionV2: sts.Type<TransactionV2> = sts.closedEnum(() => {
    return  {
        EIP1559: EIP1559Transaction,
        EIP2930: EIP2930Transaction,
        Legacy: LegacyTransaction,
    }
})

export const LegacyTransaction: sts.Type<LegacyTransaction> = sts.struct(() => {
    return  {
        nonce: sts.bigint(),
        gasPrice: sts.bigint(),
        gasLimit: sts.bigint(),
        action: TransactionAction,
        value: sts.bigint(),
        input: sts.bytes(),
        signature: TransactionSignature,
    }
})

export const TransactionSignature: sts.Type<TransactionSignature> = sts.struct(() => {
    return  {
        v: TransactionRecoveryId,
        r: H256,
        s: H256,
    }
})

export const TransactionRecoveryId = sts.bigint()

export interface TransactionSignature {
    v: TransactionRecoveryId
    r: H256
    s: H256
}

export type H256 = Bytes

export type TransactionRecoveryId = bigint

export const TransactionAction: sts.Type<TransactionAction> = sts.closedEnum(() => {
    return  {
        Call: H160,
        Create: sts.unit(),
    }
})

export type TransactionAction = TransactionAction_Call | TransactionAction_Create

export interface TransactionAction_Call {
    __kind: 'Call'
    value: H160
}

export interface TransactionAction_Create {
    __kind: 'Create'
}

export type H160 = Bytes

export interface LegacyTransaction {
    nonce: bigint
    gasPrice: bigint
    gasLimit: bigint
    action: TransactionAction
    value: bigint
    input: Bytes
    signature: TransactionSignature
}

export const EIP2930Transaction: sts.Type<EIP2930Transaction> = sts.struct(() => {
    return  {
        chainId: sts.bigint(),
        nonce: sts.bigint(),
        gasPrice: sts.bigint(),
        gasLimit: sts.bigint(),
        action: TransactionAction,
        value: sts.bigint(),
        input: sts.bytes(),
        accessList: sts.array(() => AccessListItem),
        oddYParity: sts.boolean(),
        r: H256,
        s: H256,
    }
})

export const AccessListItem: sts.Type<AccessListItem> = sts.struct(() => {
    return  {
        address: H160,
        storageKeys: sts.array(() => H256),
    }
})

export interface AccessListItem {
    address: H160
    storageKeys: H256[]
}

export interface EIP2930Transaction {
    chainId: bigint
    nonce: bigint
    gasPrice: bigint
    gasLimit: bigint
    action: TransactionAction
    value: bigint
    input: Bytes
    accessList: AccessListItem[]
    oddYParity: boolean
    r: H256
    s: H256
}

export const EIP1559Transaction: sts.Type<EIP1559Transaction> = sts.struct(() => {
    return  {
        chainId: sts.bigint(),
        nonce: sts.bigint(),
        maxPriorityFeePerGas: sts.bigint(),
        maxFeePerGas: sts.bigint(),
        gasLimit: sts.bigint(),
        action: TransactionAction,
        value: sts.bigint(),
        input: sts.bytes(),
        accessList: sts.array(() => AccessListItem),
        oddYParity: sts.boolean(),
        r: H256,
        s: H256,
    }
})

export interface EIP1559Transaction {
    chainId: bigint
    nonce: bigint
    maxPriorityFeePerGas: bigint
    maxFeePerGas: bigint
    gasLimit: bigint
    action: TransactionAction
    value: bigint
    input: Bytes
    accessList: AccessListItem[]
    oddYParity: boolean
    r: H256
    s: H256
}

export type TransactionV2 = TransactionV2_EIP1559 | TransactionV2_EIP2930 | TransactionV2_Legacy

export interface TransactionV2_EIP1559 {
    __kind: 'EIP1559'
    value: EIP1559Transaction
}

export interface TransactionV2_EIP2930 {
    __kind: 'EIP2930'
    value: EIP2930Transaction
}

export interface TransactionV2_Legacy {
    __kind: 'Legacy'
    value: LegacyTransaction
}

export const ExitReason: sts.Type<ExitReason> = sts.closedEnum(() => {
    return  {
        Error: ExitError,
        Fatal: ExitFatal,
        Revert: ExitRevert,
        Succeed: ExitSucceed,
    }
})

export const ExitSucceed: sts.Type<ExitSucceed> = sts.closedEnum(() => {
    return  {
        Returned: sts.unit(),
        Stopped: sts.unit(),
        Suicided: sts.unit(),
    }
})

export type ExitSucceed = ExitSucceed_Returned | ExitSucceed_Stopped | ExitSucceed_Suicided

export interface ExitSucceed_Returned {
    __kind: 'Returned'
}

export interface ExitSucceed_Stopped {
    __kind: 'Stopped'
}

export interface ExitSucceed_Suicided {
    __kind: 'Suicided'
}

export const ExitRevert: sts.Type<ExitRevert> = sts.closedEnum(() => {
    return  {
        Reverted: sts.unit(),
    }
})

export type ExitRevert = ExitRevert_Reverted

export interface ExitRevert_Reverted {
    __kind: 'Reverted'
}

export const ExitFatal: sts.Type<ExitFatal> = sts.closedEnum(() => {
    return  {
        CallErrorAsFatal: ExitError,
        NotSupported: sts.unit(),
        Other: Cow,
        UnhandledInterrupt: sts.unit(),
    }
})

export const Cow = sts.string()

export type ExitFatal = ExitFatal_CallErrorAsFatal | ExitFatal_NotSupported | ExitFatal_Other | ExitFatal_UnhandledInterrupt

export interface ExitFatal_CallErrorAsFatal {
    __kind: 'CallErrorAsFatal'
    value: ExitError
}

export interface ExitFatal_NotSupported {
    __kind: 'NotSupported'
}

export interface ExitFatal_Other {
    __kind: 'Other'
    value: Cow
}

export interface ExitFatal_UnhandledInterrupt {
    __kind: 'UnhandledInterrupt'
}

export type Cow = string

export type ExitError = ExitError_CallTooDeep | ExitError_CreateCollision | ExitError_CreateContractLimit | ExitError_CreateEmpty | ExitError_DesignatedInvalid | ExitError_InvalidCode | ExitError_InvalidJump | ExitError_InvalidRange | ExitError_MaxNonce | ExitError_Other | ExitError_OutOfFund | ExitError_OutOfGas | ExitError_OutOfOffset | ExitError_PCUnderflow | ExitError_StackOverflow | ExitError_StackUnderflow

export interface ExitError_CallTooDeep {
    __kind: 'CallTooDeep'
}

export interface ExitError_CreateCollision {
    __kind: 'CreateCollision'
}

export interface ExitError_CreateContractLimit {
    __kind: 'CreateContractLimit'
}

export interface ExitError_CreateEmpty {
    __kind: 'CreateEmpty'
}

export interface ExitError_DesignatedInvalid {
    __kind: 'DesignatedInvalid'
}

export interface ExitError_InvalidCode {
    __kind: 'InvalidCode'
    value: Opcode
}

export interface ExitError_InvalidJump {
    __kind: 'InvalidJump'
}

export interface ExitError_InvalidRange {
    __kind: 'InvalidRange'
}

export interface ExitError_MaxNonce {
    __kind: 'MaxNonce'
}

export interface ExitError_Other {
    __kind: 'Other'
    value: Cow
}

export interface ExitError_OutOfFund {
    __kind: 'OutOfFund'
}

export interface ExitError_OutOfGas {
    __kind: 'OutOfGas'
}

export interface ExitError_OutOfOffset {
    __kind: 'OutOfOffset'
}

export interface ExitError_PCUnderflow {
    __kind: 'PCUnderflow'
}

export interface ExitError_StackOverflow {
    __kind: 'StackOverflow'
}

export interface ExitError_StackUnderflow {
    __kind: 'StackUnderflow'
}

export type Opcode = number

export const ExitError: sts.Type<ExitError> = sts.closedEnum(() => {
    return  {
        CallTooDeep: sts.unit(),
        CreateCollision: sts.unit(),
        CreateContractLimit: sts.unit(),
        CreateEmpty: sts.unit(),
        DesignatedInvalid: sts.unit(),
        InvalidCode: Opcode,
        InvalidJump: sts.unit(),
        InvalidRange: sts.unit(),
        MaxNonce: sts.unit(),
        Other: Cow,
        OutOfFund: sts.unit(),
        OutOfGas: sts.unit(),
        OutOfOffset: sts.unit(),
        PCUnderflow: sts.unit(),
        StackOverflow: sts.unit(),
        StackUnderflow: sts.unit(),
    }
})

export const Opcode = sts.number()

export type ExitReason = ExitReason_Error | ExitReason_Fatal | ExitReason_Revert | ExitReason_Succeed

export interface ExitReason_Error {
    __kind: 'Error'
    value: ExitError
}

export interface ExitReason_Fatal {
    __kind: 'Fatal'
    value: ExitFatal
}

export interface ExitReason_Revert {
    __kind: 'Revert'
    value: ExitRevert
}

export interface ExitReason_Succeed {
    __kind: 'Succeed'
    value: ExitSucceed
}

export const H256 = sts.bytes()

export const H160 = sts.bytes()

export const AccountId20 = sts.bytes()

export const DispatchError: sts.Type<DispatchError> = sts.closedEnum(() => {
    return  {
        Arithmetic: ArithmeticError,
        BadOrigin: sts.unit(),
        CannotLookup: sts.unit(),
        ConsumerRemaining: sts.unit(),
        Corruption: sts.unit(),
        Exhausted: sts.unit(),
        Module: ModuleError,
        NoProviders: sts.unit(),
        Other: sts.unit(),
        RootNotAllowed: sts.unit(),
        Token: TokenError,
        TooManyConsumers: sts.unit(),
        Transactional: TransactionalError,
        Unavailable: sts.unit(),
    }
})

export const TransactionalError: sts.Type<TransactionalError> = sts.closedEnum(() => {
    return  {
        LimitReached: sts.unit(),
        NoLayer: sts.unit(),
    }
})

export type TransactionalError = TransactionalError_LimitReached | TransactionalError_NoLayer

export interface TransactionalError_LimitReached {
    __kind: 'LimitReached'
}

export interface TransactionalError_NoLayer {
    __kind: 'NoLayer'
}

export const TokenError: sts.Type<TokenError> = sts.closedEnum(() => {
    return  {
        BelowMinimum: sts.unit(),
        Blocked: sts.unit(),
        CannotCreate: sts.unit(),
        CannotCreateHold: sts.unit(),
        Frozen: sts.unit(),
        FundsUnavailable: sts.unit(),
        NotExpendable: sts.unit(),
        OnlyProvider: sts.unit(),
        UnknownAsset: sts.unit(),
        Unsupported: sts.unit(),
    }
})

export type TokenError = TokenError_BelowMinimum | TokenError_Blocked | TokenError_CannotCreate | TokenError_CannotCreateHold | TokenError_Frozen | TokenError_FundsUnavailable | TokenError_NotExpendable | TokenError_OnlyProvider | TokenError_UnknownAsset | TokenError_Unsupported

export interface TokenError_BelowMinimum {
    __kind: 'BelowMinimum'
}

export interface TokenError_Blocked {
    __kind: 'Blocked'
}

export interface TokenError_CannotCreate {
    __kind: 'CannotCreate'
}

export interface TokenError_CannotCreateHold {
    __kind: 'CannotCreateHold'
}

export interface TokenError_Frozen {
    __kind: 'Frozen'
}

export interface TokenError_FundsUnavailable {
    __kind: 'FundsUnavailable'
}

export interface TokenError_NotExpendable {
    __kind: 'NotExpendable'
}

export interface TokenError_OnlyProvider {
    __kind: 'OnlyProvider'
}

export interface TokenError_UnknownAsset {
    __kind: 'UnknownAsset'
}

export interface TokenError_Unsupported {
    __kind: 'Unsupported'
}

export const ModuleError: sts.Type<ModuleError> = sts.struct(() => {
    return  {
        index: sts.number(),
        error: sts.bytes(),
    }
})

export interface ModuleError {
    index: number
    error: Bytes
}

export const ArithmeticError: sts.Type<ArithmeticError> = sts.closedEnum(() => {
    return  {
        DivisionByZero: sts.unit(),
        Overflow: sts.unit(),
        Underflow: sts.unit(),
    }
})

export type ArithmeticError = ArithmeticError_DivisionByZero | ArithmeticError_Overflow | ArithmeticError_Underflow

export interface ArithmeticError_DivisionByZero {
    __kind: 'DivisionByZero'
}

export interface ArithmeticError_Overflow {
    __kind: 'Overflow'
}

export interface ArithmeticError_Underflow {
    __kind: 'Underflow'
}

export type DispatchError = DispatchError_Arithmetic | DispatchError_BadOrigin | DispatchError_CannotLookup | DispatchError_ConsumerRemaining | DispatchError_Corruption | DispatchError_Exhausted | DispatchError_Module | DispatchError_NoProviders | DispatchError_Other | DispatchError_RootNotAllowed | DispatchError_Token | DispatchError_TooManyConsumers | DispatchError_Transactional | DispatchError_Unavailable

export interface DispatchError_Arithmetic {
    __kind: 'Arithmetic'
    value: ArithmeticError
}

export interface DispatchError_BadOrigin {
    __kind: 'BadOrigin'
}

export interface DispatchError_CannotLookup {
    __kind: 'CannotLookup'
}

export interface DispatchError_ConsumerRemaining {
    __kind: 'ConsumerRemaining'
}

export interface DispatchError_Corruption {
    __kind: 'Corruption'
}

export interface DispatchError_Exhausted {
    __kind: 'Exhausted'
}

export interface DispatchError_Module {
    __kind: 'Module'
    value: ModuleError
}

export interface DispatchError_NoProviders {
    __kind: 'NoProviders'
}

export interface DispatchError_Other {
    __kind: 'Other'
}

export interface DispatchError_RootNotAllowed {
    __kind: 'RootNotAllowed'
}

export interface DispatchError_Token {
    __kind: 'Token'
    value: TokenError
}

export interface DispatchError_TooManyConsumers {
    __kind: 'TooManyConsumers'
}

export interface DispatchError_Transactional {
    __kind: 'Transactional'
    value: TransactionalError
}

export interface DispatchError_Unavailable {
    __kind: 'Unavailable'
}

export const DispatchInfo: sts.Type<DispatchInfo> = sts.struct(() => {
    return  {
        weight: Weight,
        class: DispatchClass,
        paysFee: Pays,
    }
})

export const Pays: sts.Type<Pays> = sts.closedEnum(() => {
    return  {
        No: sts.unit(),
        Yes: sts.unit(),
    }
})

export type Pays = Pays_No | Pays_Yes

export interface Pays_No {
    __kind: 'No'
}

export interface Pays_Yes {
    __kind: 'Yes'
}

export const DispatchClass: sts.Type<DispatchClass> = sts.closedEnum(() => {
    return  {
        Mandatory: sts.unit(),
        Normal: sts.unit(),
        Operational: sts.unit(),
    }
})

export type DispatchClass = DispatchClass_Mandatory | DispatchClass_Normal | DispatchClass_Operational

export interface DispatchClass_Mandatory {
    __kind: 'Mandatory'
}

export interface DispatchClass_Normal {
    __kind: 'Normal'
}

export interface DispatchClass_Operational {
    __kind: 'Operational'
}

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

export interface DispatchInfo {
    weight: Weight
    class: DispatchClass
    paysFee: Pays
}
