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

export const Call: sts.Type<Call> = sts.closedEnum(() => {
    return  {
        AuthorInherent: AuthorInherentCall,
        AuthoritiesNoting: AuthoritiesNotingCall,
        Balances: BalancesCall,
        BaseFee: BaseFeeCall,
        DynamicFee: DynamicFeeCall,
        EVM: EVMCall,
        Ethereum: EthereumCall,
        HotfixSufficients: HotfixSufficientsCall,
        ParachainInfo: ParachainInfoCall,
        ParachainSystem: ParachainSystemCall,
        Sudo: SudoCall,
        System: SystemCall,
        Timestamp: TimestampCall,
        Utility: UtilityCall,
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const UtilityCall: sts.Type<UtilityCall> = sts.closedEnum(() => {
    return  {
        as_derivative: sts.enumStruct({
            index: sts.number(),
            call: Call,
        }),
        batch: sts.enumStruct({
            calls: sts.array(() => Call),
        }),
        batch_all: sts.enumStruct({
            calls: sts.array(() => Call),
        }),
        dispatch_as: sts.enumStruct({
            asOrigin: OriginCaller,
            call: Call,
        }),
        force_batch: sts.enumStruct({
            calls: sts.array(() => Call),
        }),
        with_weight: sts.enumStruct({
            call: Call,
            weight: Weight,
        }),
    }
})

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

export const OriginCaller: sts.Type<OriginCaller> = sts.closedEnum(() => {
    return  {
        Ethereum: Type_125,
        Void: Void,
        system: RawOrigin,
    }
})

export const RawOrigin: sts.Type<RawOrigin> = sts.closedEnum(() => {
    return  {
        None: sts.unit(),
        Root: sts.unit(),
        Signed: AccountId20,
    }
})

export type RawOrigin = RawOrigin_None | RawOrigin_Root | RawOrigin_Signed

export interface RawOrigin_None {
    __kind: 'None'
}

export interface RawOrigin_Root {
    __kind: 'Root'
}

export interface RawOrigin_Signed {
    __kind: 'Signed'
    value: AccountId20
}

export type AccountId20 = Bytes

export const Void: sts.Type<Void> = sts.closedEnum(() => {
    return  {
    }
})

export type Void = never

export const Type_125: sts.Type<Type_125> = sts.closedEnum(() => {
    return  {
        EthereumTransaction: H160,
    }
})

export type Type_125 = Type_125_EthereumTransaction

export interface Type_125_EthereumTransaction {
    __kind: 'EthereumTransaction'
    value: H160
}

export type OriginCaller = OriginCaller_Ethereum | OriginCaller_Void | OriginCaller_system

export interface OriginCaller_Ethereum {
    __kind: 'Ethereum'
    value: Type_125
}

export interface OriginCaller_Void {
    __kind: 'Void'
    value: Void
}

export interface OriginCaller_system {
    __kind: 'system'
    value: RawOrigin
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type UtilityCall = UtilityCall_as_derivative | UtilityCall_batch | UtilityCall_batch_all | UtilityCall_dispatch_as | UtilityCall_force_batch | UtilityCall_with_weight

/**
 * Send a call through an indexed pseudonym of the sender.
 * 
 * Filter from origin are passed along. The call will be dispatched with an origin which
 * use the same filter as the origin of this call.
 * 
 * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
 * because you expect `proxy` to have been used prior in the call stack and you do not want
 * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
 * in the Multisig pallet instead.
 * 
 * NOTE: Prior to version *12, this was called `as_limited_sub`.
 * 
 * The dispatch origin for this call must be _Signed_.
 */
export interface UtilityCall_as_derivative {
    __kind: 'as_derivative'
    index: number
    call: Call
}

/**
 * Send a batch of dispatch calls.
 * 
 * May be called from any origin except `None`.
 * 
 * - `calls`: The calls to be dispatched from the same origin. The number of call must not
 *   exceed the constant: `batched_calls_limit` (available in constant metadata).
 * 
 * If origin is root then the calls are dispatched without checking origin filter. (This
 * includes bypassing `frame_system::Config::BaseCallFilter`).
 * 
 * ## Complexity
 * - O(C) where C is the number of calls to be batched.
 * 
 * This will return `Ok` in all circumstances. To determine the success of the batch, an
 * event is deposited. If a call failed and the batch was interrupted, then the
 * `BatchInterrupted` event is deposited, along with the number of successful calls made
 * and the error of the failed call. If all were successful, then the `BatchCompleted`
 * event is deposited.
 */
export interface UtilityCall_batch {
    __kind: 'batch'
    calls: Call[]
}

/**
 * Send a batch of dispatch calls and atomically execute them.
 * The whole transaction will rollback and fail if any of the calls failed.
 * 
 * May be called from any origin except `None`.
 * 
 * - `calls`: The calls to be dispatched from the same origin. The number of call must not
 *   exceed the constant: `batched_calls_limit` (available in constant metadata).
 * 
 * If origin is root then the calls are dispatched without checking origin filter. (This
 * includes bypassing `frame_system::Config::BaseCallFilter`).
 * 
 * ## Complexity
 * - O(C) where C is the number of calls to be batched.
 */
export interface UtilityCall_batch_all {
    __kind: 'batch_all'
    calls: Call[]
}

/**
 * Dispatches a function call with a provided origin.
 * 
 * The dispatch origin for this call must be _Root_.
 * 
 * ## Complexity
 * - O(1).
 */
export interface UtilityCall_dispatch_as {
    __kind: 'dispatch_as'
    asOrigin: OriginCaller
    call: Call
}

/**
 * Send a batch of dispatch calls.
 * Unlike `batch`, it allows errors and won't interrupt.
 * 
 * May be called from any origin except `None`.
 * 
 * - `calls`: The calls to be dispatched from the same origin. The number of call must not
 *   exceed the constant: `batched_calls_limit` (available in constant metadata).
 * 
 * If origin is root then the calls are dispatch without checking origin filter. (This
 * includes bypassing `frame_system::Config::BaseCallFilter`).
 * 
 * ## Complexity
 * - O(C) where C is the number of calls to be batched.
 */
export interface UtilityCall_force_batch {
    __kind: 'force_batch'
    calls: Call[]
}

/**
 * Dispatch a function call with a specified weight.
 * 
 * This function does not check the weight of the call, and instead allows the
 * Root origin to specify the weight of the call.
 * 
 * The dispatch origin for this call must be _Root_.
 */
export interface UtilityCall_with_weight {
    __kind: 'with_weight'
    call: Call
    weight: Weight
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const TimestampCall: sts.Type<TimestampCall> = sts.closedEnum(() => {
    return  {
        set: sts.enumStruct({
            now: sts.bigint(),
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type TimestampCall = TimestampCall_set

/**
 * Set the current time.
 * 
 * This call should be invoked exactly once per block. It will panic at the finalization
 * phase, if this call hasn't been invoked by that time.
 * 
 * The timestamp should be greater than the previous one by the amount specified by
 * `MinimumPeriod`.
 * 
 * The dispatch origin for this call must be `Inherent`.
 * 
 * ## Complexity
 * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
 * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in
 *   `on_finalize`)
 * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
 */
export interface TimestampCall_set {
    __kind: 'set'
    now: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const SystemCall: sts.Type<SystemCall> = sts.closedEnum(() => {
    return  {
        kill_prefix: sts.enumStruct({
            prefix: sts.bytes(),
            subkeys: sts.number(),
        }),
        kill_storage: sts.enumStruct({
            keys: sts.array(() => sts.bytes()),
        }),
        remark: sts.enumStruct({
            remark: sts.bytes(),
        }),
        remark_with_event: sts.enumStruct({
            remark: sts.bytes(),
        }),
        set_code: sts.enumStruct({
            code: sts.bytes(),
        }),
        set_code_without_checks: sts.enumStruct({
            code: sts.bytes(),
        }),
        set_heap_pages: sts.enumStruct({
            pages: sts.bigint(),
        }),
        set_storage: sts.enumStruct({
            items: sts.array(() => sts.tuple(() => [sts.bytes(), sts.bytes()])),
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type SystemCall = SystemCall_kill_prefix | SystemCall_kill_storage | SystemCall_remark | SystemCall_remark_with_event | SystemCall_set_code | SystemCall_set_code_without_checks | SystemCall_set_heap_pages | SystemCall_set_storage

/**
 * Kill all storage items with a key that starts with the given prefix.
 * 
 * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
 * the prefix we are removing to accurately calculate the weight of this function.
 */
export interface SystemCall_kill_prefix {
    __kind: 'kill_prefix'
    prefix: Bytes
    subkeys: number
}

/**
 * Kill some items from storage.
 */
export interface SystemCall_kill_storage {
    __kind: 'kill_storage'
    keys: Bytes[]
}

/**
 * Make some on-chain remark.
 * 
 * - `O(1)`
 */
export interface SystemCall_remark {
    __kind: 'remark'
    remark: Bytes
}

/**
 * Make some on-chain remark and emit event.
 */
export interface SystemCall_remark_with_event {
    __kind: 'remark_with_event'
    remark: Bytes
}

/**
 * Set the new runtime code.
 */
export interface SystemCall_set_code {
    __kind: 'set_code'
    code: Bytes
}

/**
 * Set the new runtime code without doing any checks of the given `code`.
 */
export interface SystemCall_set_code_without_checks {
    __kind: 'set_code_without_checks'
    code: Bytes
}

/**
 * Set the number of pages in the WebAssembly environment's heap.
 */
export interface SystemCall_set_heap_pages {
    __kind: 'set_heap_pages'
    pages: bigint
}

/**
 * Set some items of storage.
 */
export interface SystemCall_set_storage {
    __kind: 'set_storage'
    items: [Bytes, Bytes][]
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const SudoCall: sts.Type<SudoCall> = sts.closedEnum(() => {
    return  {
        set_key: sts.enumStruct({
            new: AccountId20,
        }),
        sudo: sts.enumStruct({
            call: Call,
        }),
        sudo_as: sts.enumStruct({
            who: AccountId20,
            call: Call,
        }),
        sudo_unchecked_weight: sts.enumStruct({
            call: Call,
            weight: Weight,
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type SudoCall = SudoCall_set_key | SudoCall_sudo | SudoCall_sudo_as | SudoCall_sudo_unchecked_weight

/**
 * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
 * key.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * ## Complexity
 * - O(1).
 */
export interface SudoCall_set_key {
    __kind: 'set_key'
    new: AccountId20
}

/**
 * Authenticates the sudo key and dispatches a function call with `Root` origin.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * ## Complexity
 * - O(1).
 */
export interface SudoCall_sudo {
    __kind: 'sudo'
    call: Call
}

/**
 * Authenticates the sudo key and dispatches a function call with `Signed` origin from
 * a given account.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * ## Complexity
 * - O(1).
 */
export interface SudoCall_sudo_as {
    __kind: 'sudo_as'
    who: AccountId20
    call: Call
}

/**
 * Authenticates the sudo key and dispatches a function call with `Root` origin.
 * This function does not check the weight of the call, and instead allows the
 * Sudo user to specify the weight of the call.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * ## Complexity
 * - O(1).
 */
export interface SudoCall_sudo_unchecked_weight {
    __kind: 'sudo_unchecked_weight'
    call: Call
    weight: Weight
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const ParachainSystemCall: sts.Type<ParachainSystemCall> = sts.closedEnum(() => {
    return  {
        authorize_upgrade: sts.enumStruct({
            codeHash: H256,
            checkVersion: sts.boolean(),
        }),
        enact_authorized_upgrade: sts.enumStruct({
            code: sts.bytes(),
        }),
        set_validation_data: sts.enumStruct({
            data: ParachainInherentData,
        }),
        sudo_send_upward_message: sts.enumStruct({
            message: sts.bytes(),
        }),
    }
})

export const ParachainInherentData: sts.Type<ParachainInherentData> = sts.struct(() => {
    return  {
        validationData: V4PersistedValidationData,
        relayChainState: StorageProof,
        downwardMessages: sts.array(() => InboundDownwardMessage),
        horizontalMessages: sts.array(() => sts.tuple(() => [Id, sts.array(() => InboundHrmpMessage)])),
    }
})

export const InboundHrmpMessage: sts.Type<InboundHrmpMessage> = sts.struct(() => {
    return  {
        sentAt: sts.number(),
        data: sts.bytes(),
    }
})

export interface InboundHrmpMessage {
    sentAt: number
    data: Bytes
}

export const Id = sts.number()

export const InboundDownwardMessage: sts.Type<InboundDownwardMessage> = sts.struct(() => {
    return  {
        sentAt: sts.number(),
        msg: sts.bytes(),
    }
})

export interface InboundDownwardMessage {
    sentAt: number
    msg: Bytes
}

export const StorageProof: sts.Type<StorageProof> = sts.struct(() => {
    return  {
        trieNodes: sts.array(() => sts.bytes()),
    }
})

export interface StorageProof {
    trieNodes: Bytes[]
}

export const V4PersistedValidationData: sts.Type<V4PersistedValidationData> = sts.struct(() => {
    return  {
        parentHead: HeadData,
        relayParentNumber: sts.number(),
        relayParentStorageRoot: H256,
        maxPovSize: sts.number(),
    }
})

export const HeadData = sts.bytes()

export interface V4PersistedValidationData {
    parentHead: HeadData
    relayParentNumber: number
    relayParentStorageRoot: H256
    maxPovSize: number
}

export type HeadData = Bytes

export interface ParachainInherentData {
    validationData: V4PersistedValidationData
    relayChainState: StorageProof
    downwardMessages: InboundDownwardMessage[]
    horizontalMessages: [Id, InboundHrmpMessage[]][]
}

export type Id = number

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type ParachainSystemCall = ParachainSystemCall_authorize_upgrade | ParachainSystemCall_enact_authorized_upgrade | ParachainSystemCall_set_validation_data | ParachainSystemCall_sudo_send_upward_message

/**
 * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
 * later.
 * 
 * The `check_version` parameter sets a boolean flag for whether or not the runtime's spec
 * version and name should be verified on upgrade. Since the authorization only has a hash,
 * it cannot actually perform the verification.
 * 
 * This call requires Root origin.
 */
export interface ParachainSystemCall_authorize_upgrade {
    __kind: 'authorize_upgrade'
    codeHash: H256
    checkVersion: boolean
}

/**
 * Provide the preimage (runtime binary) `code` for an upgrade that has been authorized.
 * 
 * If the authorization required a version check, this call will ensure the spec name
 * remains unchanged and that the spec version has increased.
 * 
 * Note that this function will not apply the new `code`, but only attempt to schedule the
 * upgrade with the Relay Chain.
 * 
 * All origins are allowed.
 */
export interface ParachainSystemCall_enact_authorized_upgrade {
    __kind: 'enact_authorized_upgrade'
    code: Bytes
}

/**
 * Set the current validation data.
 * 
 * This should be invoked exactly once per block. It will panic at the finalization
 * phase if the call was not invoked.
 * 
 * The dispatch origin for this call must be `Inherent`
 * 
 * As a side effect, this function upgrades the current validation function
 * if the appropriate time has come.
 */
export interface ParachainSystemCall_set_validation_data {
    __kind: 'set_validation_data'
    data: ParachainInherentData
}

export interface ParachainSystemCall_sudo_send_upward_message {
    __kind: 'sudo_send_upward_message'
    message: Bytes
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const ParachainInfoCall: sts.Type<ParachainInfoCall> = sts.closedEnum(() => {
    return  {
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type ParachainInfoCall = never

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const HotfixSufficientsCall: sts.Type<HotfixSufficientsCall> = sts.closedEnum(() => {
    return  {
        hotfix_inc_account_sufficients: sts.enumStruct({
            addresses: sts.array(() => H160),
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type HotfixSufficientsCall = HotfixSufficientsCall_hotfix_inc_account_sufficients

/**
 * Increment `sufficients` for existing accounts having a nonzero `nonce` but zero `sufficients`, `consumers` and `providers` value.
 * This state was caused by a previous bug in EVM create account dispatchable.
 * 
 * Any accounts in the input list not satisfying the above condition will remain unaffected.
 */
export interface HotfixSufficientsCall_hotfix_inc_account_sufficients {
    __kind: 'hotfix_inc_account_sufficients'
    addresses: H160[]
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const EthereumCall: sts.Type<EthereumCall> = sts.closedEnum(() => {
    return  {
        transact: sts.enumStruct({
            transaction: TransactionV2,
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type EthereumCall = EthereumCall_transact

/**
 * Transact an Ethereum transaction.
 */
export interface EthereumCall_transact {
    __kind: 'transact'
    transaction: TransactionV2
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const EVMCall: sts.Type<EVMCall> = sts.closedEnum(() => {
    return  {
        call: sts.enumStruct({
            source: H160,
            target: H160,
            input: sts.bytes(),
            value: sts.bigint(),
            gasLimit: sts.bigint(),
            maxFeePerGas: sts.bigint(),
            maxPriorityFeePerGas: sts.option(() => sts.bigint()),
            nonce: sts.option(() => sts.bigint()),
            accessList: sts.array(() => sts.tuple(() => [H160, sts.array(() => H256)])),
        }),
        create: sts.enumStruct({
            source: H160,
            init: sts.bytes(),
            value: sts.bigint(),
            gasLimit: sts.bigint(),
            maxFeePerGas: sts.bigint(),
            maxPriorityFeePerGas: sts.option(() => sts.bigint()),
            nonce: sts.option(() => sts.bigint()),
            accessList: sts.array(() => sts.tuple(() => [H160, sts.array(() => H256)])),
        }),
        create2: sts.enumStruct({
            source: H160,
            init: sts.bytes(),
            salt: H256,
            value: sts.bigint(),
            gasLimit: sts.bigint(),
            maxFeePerGas: sts.bigint(),
            maxPriorityFeePerGas: sts.option(() => sts.bigint()),
            nonce: sts.option(() => sts.bigint()),
            accessList: sts.array(() => sts.tuple(() => [H160, sts.array(() => H256)])),
        }),
        withdraw: sts.enumStruct({
            address: H160,
            value: sts.bigint(),
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type EVMCall = EVMCall_call | EVMCall_create | EVMCall_create2 | EVMCall_withdraw

/**
 * Issue an EVM call operation. This is similar to a message call transaction in Ethereum.
 */
export interface EVMCall_call {
    __kind: 'call'
    source: H160
    target: H160
    input: Bytes
    value: bigint
    gasLimit: bigint
    maxFeePerGas: bigint
    maxPriorityFeePerGas?: (bigint | undefined)
    nonce?: (bigint | undefined)
    accessList: [H160, H256[]][]
}

/**
 * Issue an EVM create operation. This is similar to a contract creation transaction in
 * Ethereum.
 */
export interface EVMCall_create {
    __kind: 'create'
    source: H160
    init: Bytes
    value: bigint
    gasLimit: bigint
    maxFeePerGas: bigint
    maxPriorityFeePerGas?: (bigint | undefined)
    nonce?: (bigint | undefined)
    accessList: [H160, H256[]][]
}

/**
 * Issue an EVM create2 operation.
 */
export interface EVMCall_create2 {
    __kind: 'create2'
    source: H160
    init: Bytes
    salt: H256
    value: bigint
    gasLimit: bigint
    maxFeePerGas: bigint
    maxPriorityFeePerGas?: (bigint | undefined)
    nonce?: (bigint | undefined)
    accessList: [H160, H256[]][]
}

/**
 * Withdraw balance from EVM into currency/balances pallet.
 */
export interface EVMCall_withdraw {
    __kind: 'withdraw'
    address: H160
    value: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const DynamicFeeCall: sts.Type<DynamicFeeCall> = sts.closedEnum(() => {
    return  {
        note_min_gas_price_target: sts.enumStruct({
            target: sts.bigint(),
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type DynamicFeeCall = DynamicFeeCall_note_min_gas_price_target

export interface DynamicFeeCall_note_min_gas_price_target {
    __kind: 'note_min_gas_price_target'
    target: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const BaseFeeCall: sts.Type<BaseFeeCall> = sts.closedEnum(() => {
    return  {
        set_base_fee_per_gas: sts.enumStruct({
            fee: sts.bigint(),
        }),
        set_elasticity: sts.enumStruct({
            elasticity: Permill,
        }),
    }
})

export const Permill = sts.number()

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type BaseFeeCall = BaseFeeCall_set_base_fee_per_gas | BaseFeeCall_set_elasticity

export interface BaseFeeCall_set_base_fee_per_gas {
    __kind: 'set_base_fee_per_gas'
    fee: bigint
}

export interface BaseFeeCall_set_elasticity {
    __kind: 'set_elasticity'
    elasticity: Permill
}

export type Permill = number

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const BalancesCall: sts.Type<BalancesCall> = sts.closedEnum(() => {
    return  {
        force_set_balance: sts.enumStruct({
            who: AccountId20,
            newFree: sts.bigint(),
        }),
        force_transfer: sts.enumStruct({
            source: AccountId20,
            dest: AccountId20,
            value: sts.bigint(),
        }),
        force_unreserve: sts.enumStruct({
            who: AccountId20,
            amount: sts.bigint(),
        }),
        set_balance_deprecated: sts.enumStruct({
            who: AccountId20,
            newFree: sts.bigint(),
            oldReserved: sts.bigint(),
        }),
        transfer: sts.enumStruct({
            dest: AccountId20,
            value: sts.bigint(),
        }),
        transfer_all: sts.enumStruct({
            dest: AccountId20,
            keepAlive: sts.boolean(),
        }),
        transfer_allow_death: sts.enumStruct({
            dest: AccountId20,
            value: sts.bigint(),
        }),
        transfer_keep_alive: sts.enumStruct({
            dest: AccountId20,
            value: sts.bigint(),
        }),
        upgrade_accounts: sts.enumStruct({
            who: sts.array(() => AccountId20),
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type BalancesCall = BalancesCall_force_set_balance | BalancesCall_force_transfer | BalancesCall_force_unreserve | BalancesCall_set_balance_deprecated | BalancesCall_transfer | BalancesCall_transfer_all | BalancesCall_transfer_allow_death | BalancesCall_transfer_keep_alive | BalancesCall_upgrade_accounts

/**
 * Set the regular balance of a given account.
 * 
 * The dispatch origin for this call is `root`.
 */
export interface BalancesCall_force_set_balance {
    __kind: 'force_set_balance'
    who: AccountId20
    newFree: bigint
}

/**
 * Exactly as `transfer_allow_death`, except the origin must be root and the source account
 * may be specified.
 */
export interface BalancesCall_force_transfer {
    __kind: 'force_transfer'
    source: AccountId20
    dest: AccountId20
    value: bigint
}

/**
 * Unreserve some balance from a user by force.
 * 
 * Can only be called by ROOT.
 */
export interface BalancesCall_force_unreserve {
    __kind: 'force_unreserve'
    who: AccountId20
    amount: bigint
}

/**
 * Set the regular balance of a given account; it also takes a reserved balance but this
 * must be the same as the account's current reserved balance.
 * 
 * The dispatch origin for this call is `root`.
 * 
 * WARNING: This call is DEPRECATED! Use `force_set_balance` instead.
 */
export interface BalancesCall_set_balance_deprecated {
    __kind: 'set_balance_deprecated'
    who: AccountId20
    newFree: bigint
    oldReserved: bigint
}

/**
 * Alias for `transfer_allow_death`, provided only for name-wise compatibility.
 * 
 * WARNING: DEPRECATED! Will be released in approximately 3 months.
 */
export interface BalancesCall_transfer {
    __kind: 'transfer'
    dest: AccountId20
    value: bigint
}

/**
 * Transfer the entire transferable balance from the caller account.
 * 
 * NOTE: This function only attempts to transfer _transferable_ balances. This means that
 * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
 * transferred by this function. To ensure that this function results in a killed account,
 * you might need to prepare the account by removing any reference counters, storage
 * deposits, etc...
 * 
 * The dispatch origin of this call must be Signed.
 * 
 * - `dest`: The recipient of the transfer.
 * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
 *   of the funds the account has, causing the sender account to be killed (false), or
 *   transfer everything except at least the existential deposit, which will guarantee to
 *   keep the sender account alive (true).
 */
export interface BalancesCall_transfer_all {
    __kind: 'transfer_all'
    dest: AccountId20
    keepAlive: boolean
}

/**
 * Transfer some liquid free balance to another account.
 * 
 * `transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
 * If the sender's account is below the existential deposit as a result
 * of the transfer, the account will be reaped.
 * 
 * The dispatch origin for this call must be `Signed` by the transactor.
 */
export interface BalancesCall_transfer_allow_death {
    __kind: 'transfer_allow_death'
    dest: AccountId20
    value: bigint
}

/**
 * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
 * kill the origin account.
 * 
 * 99% of the time you want [`transfer_allow_death`] instead.
 * 
 * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
 */
export interface BalancesCall_transfer_keep_alive {
    __kind: 'transfer_keep_alive'
    dest: AccountId20
    value: bigint
}

/**
 * Upgrade a specified account.
 * 
 * - `origin`: Must be `Signed`.
 * - `who`: The account to be upgraded.
 * 
 * This will waive the transaction fee if at least all but 10% of the accounts needed to
 * be upgraded. (We let some not have to be upgraded just in order to allow for the
 * possibililty of churn).
 */
export interface BalancesCall_upgrade_accounts {
    __kind: 'upgrade_accounts'
    who: AccountId20[]
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const AuthoritiesNotingCall: sts.Type<AuthoritiesNotingCall> = sts.closedEnum(() => {
    return  {
        set_authorities: sts.enumStruct({
            authorities: sts.array(() => Public),
        }),
        set_latest_authorities_data: sts.enumStruct({
            data: ContainerChainAuthoritiesInherentData,
        }),
        set_orchestrator_para_id: sts.enumStruct({
            newParaId: Id,
        }),
    }
})

export const ContainerChainAuthoritiesInherentData: sts.Type<ContainerChainAuthoritiesInherentData> = sts.struct(() => {
    return  {
        relayChainState: StorageProof,
        orchestratorChainState: StorageProof,
    }
})

export interface ContainerChainAuthoritiesInherentData {
    relayChainState: StorageProof
    orchestratorChainState: StorageProof
}

export const Public = sts.bytes()

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type AuthoritiesNotingCall = AuthoritiesNotingCall_set_authorities | AuthoritiesNotingCall_set_latest_authorities_data | AuthoritiesNotingCall_set_orchestrator_para_id

export interface AuthoritiesNotingCall_set_authorities {
    __kind: 'set_authorities'
    authorities: Public[]
}

export interface AuthoritiesNotingCall_set_latest_authorities_data {
    __kind: 'set_latest_authorities_data'
    data: ContainerChainAuthoritiesInherentData
}

export interface AuthoritiesNotingCall_set_orchestrator_para_id {
    __kind: 'set_orchestrator_para_id'
    newParaId: Id
}

export type Public = Bytes

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const AuthorInherentCall: sts.Type<AuthorInherentCall> = sts.closedEnum(() => {
    return  {
        kick_off_authorship_validation: sts.unit(),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type AuthorInherentCall = AuthorInherentCall_kick_off_authorship_validation

/**
 * This inherent is a workaround to run code after the "real" inherents have executed,
 * but before transactions are executed.
 */
export interface AuthorInherentCall_kick_off_authorship_validation {
    __kind: 'kick_off_authorship_validation'
}

export type Call = Call_AuthorInherent | Call_AuthoritiesNoting | Call_Balances | Call_BaseFee | Call_DynamicFee | Call_EVM | Call_Ethereum | Call_HotfixSufficients | Call_ParachainInfo | Call_ParachainSystem | Call_Sudo | Call_System | Call_Timestamp | Call_Utility

export interface Call_AuthorInherent {
    __kind: 'AuthorInherent'
    value: AuthorInherentCall
}

export interface Call_AuthoritiesNoting {
    __kind: 'AuthoritiesNoting'
    value: AuthoritiesNotingCall
}

export interface Call_Balances {
    __kind: 'Balances'
    value: BalancesCall
}

export interface Call_BaseFee {
    __kind: 'BaseFee'
    value: BaseFeeCall
}

export interface Call_DynamicFee {
    __kind: 'DynamicFee'
    value: DynamicFeeCall
}

export interface Call_EVM {
    __kind: 'EVM'
    value: EVMCall
}

export interface Call_Ethereum {
    __kind: 'Ethereum'
    value: EthereumCall
}

export interface Call_HotfixSufficients {
    __kind: 'HotfixSufficients'
    value: HotfixSufficientsCall
}

export interface Call_ParachainInfo {
    __kind: 'ParachainInfo'
    value: ParachainInfoCall
}

export interface Call_ParachainSystem {
    __kind: 'ParachainSystem'
    value: ParachainSystemCall
}

export interface Call_Sudo {
    __kind: 'Sudo'
    value: SudoCall
}

export interface Call_System {
    __kind: 'System'
    value: SystemCall
}

export interface Call_Timestamp {
    __kind: 'Timestamp'
    value: TimestampCall
}

export interface Call_Utility {
    __kind: 'Utility'
    value: UtilityCall
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

export interface DispatchInfo {
    weight: Weight
    class: DispatchClass
    paysFee: Pays
}
