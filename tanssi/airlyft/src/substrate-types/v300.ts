import {sts, Result, Option, Bytes, BitSequence} from './support'

export const Call: sts.Type<Call> = sts.closedEnum(() => {
    return  {
        AuthorInherent: AuthorInherentCall,
        AuthoritiesNoting: AuthoritiesNotingCall,
        AwesomeAvatars: AwesomeAvatarsCall,
        Balances: BalancesCall,
        DmpQueue: DmpQueueCall,
        MaintenanceMode: MaintenanceModeCall,
        Nft: NftCall,
        ParachainInfo: ParachainInfoCall,
        ParachainSystem: ParachainSystemCall,
        PolkadotXcm: PolkadotXcmCall,
        Proxy: ProxyCall,
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
        CumulusXcm: Origin,
        PolkadotXcm: Type_204,
        Void: Void,
        system: RawOrigin,
    }
})

export const RawOrigin: sts.Type<RawOrigin> = sts.closedEnum(() => {
    return  {
        None: sts.unit(),
        Root: sts.unit(),
        Signed: AccountId32,
    }
})

export const AccountId32 = sts.bytes()

export type RawOrigin = RawOrigin_None | RawOrigin_Root | RawOrigin_Signed

export interface RawOrigin_None {
    __kind: 'None'
}

export interface RawOrigin_Root {
    __kind: 'Root'
}

export interface RawOrigin_Signed {
    __kind: 'Signed'
    value: AccountId32
}

export type AccountId32 = Bytes

export const Void: sts.Type<Void> = sts.closedEnum(() => {
    return  {
    }
})

export type Void = never

export const Type_204: sts.Type<Type_204> = sts.closedEnum(() => {
    return  {
        Response: V3MultiLocation,
        Xcm: V3MultiLocation,
    }
})

export const V3MultiLocation: sts.Type<V3MultiLocation> = sts.struct(() => {
    return  {
        parents: sts.number(),
        interior: V3Junctions,
    }
})

export const V3Junctions: sts.Type<V3Junctions> = sts.closedEnum(() => {
    return  {
        Here: sts.unit(),
        X1: V3Junction,
        X2: sts.tuple(() => [V3Junction, V3Junction]),
        X3: sts.tuple(() => [V3Junction, V3Junction, V3Junction]),
        X4: sts.tuple(() => [V3Junction, V3Junction, V3Junction, V3Junction]),
        X5: sts.tuple(() => [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]),
        X6: sts.tuple(() => [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]),
        X7: sts.tuple(() => [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]),
        X8: sts.tuple(() => [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]),
    }
})

export const V3Junction: sts.Type<V3Junction> = sts.closedEnum(() => {
    return  {
        AccountId32: sts.enumStruct({
            network: sts.option(() => V3NetworkId),
            id: sts.bytes(),
        }),
        AccountIndex64: sts.enumStruct({
            network: sts.option(() => V3NetworkId),
            index: sts.bigint(),
        }),
        AccountKey20: sts.enumStruct({
            network: sts.option(() => V3NetworkId),
            key: sts.bytes(),
        }),
        GeneralIndex: sts.bigint(),
        GeneralKey: sts.enumStruct({
            length: sts.number(),
            data: sts.bytes(),
        }),
        GlobalConsensus: V3NetworkId,
        OnlyChild: sts.unit(),
        PalletInstance: sts.number(),
        Parachain: sts.number(),
        Plurality: sts.enumStruct({
            id: V3BodyId,
            part: V3BodyPart,
        }),
    }
})

export const V3BodyPart: sts.Type<V3BodyPart> = sts.closedEnum(() => {
    return  {
        AtLeastProportion: sts.enumStruct({
            nom: sts.number(),
            denom: sts.number(),
        }),
        Fraction: sts.enumStruct({
            nom: sts.number(),
            denom: sts.number(),
        }),
        Members: sts.enumStruct({
            count: sts.number(),
        }),
        MoreThanProportion: sts.enumStruct({
            nom: sts.number(),
            denom: sts.number(),
        }),
        Voice: sts.unit(),
    }
})

export type V3BodyPart = V3BodyPart_AtLeastProportion | V3BodyPart_Fraction | V3BodyPart_Members | V3BodyPart_MoreThanProportion | V3BodyPart_Voice

export interface V3BodyPart_AtLeastProportion {
    __kind: 'AtLeastProportion'
    nom: number
    denom: number
}

export interface V3BodyPart_Fraction {
    __kind: 'Fraction'
    nom: number
    denom: number
}

export interface V3BodyPart_Members {
    __kind: 'Members'
    count: number
}

export interface V3BodyPart_MoreThanProportion {
    __kind: 'MoreThanProportion'
    nom: number
    denom: number
}

export interface V3BodyPart_Voice {
    __kind: 'Voice'
}

export const V3BodyId: sts.Type<V3BodyId> = sts.closedEnum(() => {
    return  {
        Administration: sts.unit(),
        Defense: sts.unit(),
        Executive: sts.unit(),
        Index: sts.number(),
        Judicial: sts.unit(),
        Legislative: sts.unit(),
        Moniker: sts.bytes(),
        Technical: sts.unit(),
        Treasury: sts.unit(),
        Unit: sts.unit(),
    }
})

export type V3BodyId = V3BodyId_Administration | V3BodyId_Defense | V3BodyId_Executive | V3BodyId_Index | V3BodyId_Judicial | V3BodyId_Legislative | V3BodyId_Moniker | V3BodyId_Technical | V3BodyId_Treasury | V3BodyId_Unit

export interface V3BodyId_Administration {
    __kind: 'Administration'
}

export interface V3BodyId_Defense {
    __kind: 'Defense'
}

export interface V3BodyId_Executive {
    __kind: 'Executive'
}

export interface V3BodyId_Index {
    __kind: 'Index'
    value: number
}

export interface V3BodyId_Judicial {
    __kind: 'Judicial'
}

export interface V3BodyId_Legislative {
    __kind: 'Legislative'
}

export interface V3BodyId_Moniker {
    __kind: 'Moniker'
    value: Bytes
}

export interface V3BodyId_Technical {
    __kind: 'Technical'
}

export interface V3BodyId_Treasury {
    __kind: 'Treasury'
}

export interface V3BodyId_Unit {
    __kind: 'Unit'
}

export const V3NetworkId: sts.Type<V3NetworkId> = sts.closedEnum(() => {
    return  {
        BitcoinCash: sts.unit(),
        BitcoinCore: sts.unit(),
        ByFork: sts.enumStruct({
            blockNumber: sts.bigint(),
            blockHash: sts.bytes(),
        }),
        ByGenesis: sts.bytes(),
        Ethereum: sts.enumStruct({
            chainId: sts.bigint(),
        }),
        Kusama: sts.unit(),
        Polkadot: sts.unit(),
        Rococo: sts.unit(),
        Westend: sts.unit(),
        Wococo: sts.unit(),
    }
})

export type V3NetworkId = V3NetworkId_BitcoinCash | V3NetworkId_BitcoinCore | V3NetworkId_ByFork | V3NetworkId_ByGenesis | V3NetworkId_Ethereum | V3NetworkId_Kusama | V3NetworkId_Polkadot | V3NetworkId_Rococo | V3NetworkId_Westend | V3NetworkId_Wococo

export interface V3NetworkId_BitcoinCash {
    __kind: 'BitcoinCash'
}

export interface V3NetworkId_BitcoinCore {
    __kind: 'BitcoinCore'
}

export interface V3NetworkId_ByFork {
    __kind: 'ByFork'
    blockNumber: bigint
    blockHash: Bytes
}

export interface V3NetworkId_ByGenesis {
    __kind: 'ByGenesis'
    value: Bytes
}

export interface V3NetworkId_Ethereum {
    __kind: 'Ethereum'
    chainId: bigint
}

export interface V3NetworkId_Kusama {
    __kind: 'Kusama'
}

export interface V3NetworkId_Polkadot {
    __kind: 'Polkadot'
}

export interface V3NetworkId_Rococo {
    __kind: 'Rococo'
}

export interface V3NetworkId_Westend {
    __kind: 'Westend'
}

export interface V3NetworkId_Wococo {
    __kind: 'Wococo'
}

export type V3Junction = V3Junction_AccountId32 | V3Junction_AccountIndex64 | V3Junction_AccountKey20 | V3Junction_GeneralIndex | V3Junction_GeneralKey | V3Junction_GlobalConsensus | V3Junction_OnlyChild | V3Junction_PalletInstance | V3Junction_Parachain | V3Junction_Plurality

export interface V3Junction_AccountId32 {
    __kind: 'AccountId32'
    network?: (V3NetworkId | undefined)
    id: Bytes
}

export interface V3Junction_AccountIndex64 {
    __kind: 'AccountIndex64'
    network?: (V3NetworkId | undefined)
    index: bigint
}

export interface V3Junction_AccountKey20 {
    __kind: 'AccountKey20'
    network?: (V3NetworkId | undefined)
    key: Bytes
}

export interface V3Junction_GeneralIndex {
    __kind: 'GeneralIndex'
    value: bigint
}

export interface V3Junction_GeneralKey {
    __kind: 'GeneralKey'
    length: number
    data: Bytes
}

export interface V3Junction_GlobalConsensus {
    __kind: 'GlobalConsensus'
    value: V3NetworkId
}

export interface V3Junction_OnlyChild {
    __kind: 'OnlyChild'
}

export interface V3Junction_PalletInstance {
    __kind: 'PalletInstance'
    value: number
}

export interface V3Junction_Parachain {
    __kind: 'Parachain'
    value: number
}

export interface V3Junction_Plurality {
    __kind: 'Plurality'
    id: V3BodyId
    part: V3BodyPart
}

export type V3Junctions = V3Junctions_Here | V3Junctions_X1 | V3Junctions_X2 | V3Junctions_X3 | V3Junctions_X4 | V3Junctions_X5 | V3Junctions_X6 | V3Junctions_X7 | V3Junctions_X8

export interface V3Junctions_Here {
    __kind: 'Here'
}

export interface V3Junctions_X1 {
    __kind: 'X1'
    value: V3Junction
}

export interface V3Junctions_X2 {
    __kind: 'X2'
    value: [V3Junction, V3Junction]
}

export interface V3Junctions_X3 {
    __kind: 'X3'
    value: [V3Junction, V3Junction, V3Junction]
}

export interface V3Junctions_X4 {
    __kind: 'X4'
    value: [V3Junction, V3Junction, V3Junction, V3Junction]
}

export interface V3Junctions_X5 {
    __kind: 'X5'
    value: [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]
}

export interface V3Junctions_X6 {
    __kind: 'X6'
    value: [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]
}

export interface V3Junctions_X7 {
    __kind: 'X7'
    value: [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]
}

export interface V3Junctions_X8 {
    __kind: 'X8'
    value: [V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction, V3Junction]
}

export interface V3MultiLocation {
    parents: number
    interior: V3Junctions
}

export type Type_204 = Type_204_Response | Type_204_Xcm

export interface Type_204_Response {
    __kind: 'Response'
    value: V3MultiLocation
}

export interface Type_204_Xcm {
    __kind: 'Xcm'
    value: V3MultiLocation
}

export const Origin: sts.Type<Origin> = sts.closedEnum(() => {
    return  {
        Relay: sts.unit(),
        SiblingParachain: Id,
    }
})

export const Id = sts.number()

export type Origin = Origin_Relay | Origin_SiblingParachain

export interface Origin_Relay {
    __kind: 'Relay'
}

export interface Origin_SiblingParachain {
    __kind: 'SiblingParachain'
    value: Id
}

export type Id = number

export type OriginCaller = OriginCaller_CumulusXcm | OriginCaller_PolkadotXcm | OriginCaller_Void | OriginCaller_system

export interface OriginCaller_CumulusXcm {
    __kind: 'CumulusXcm'
    value: Origin
}

export interface OriginCaller_PolkadotXcm {
    __kind: 'PolkadotXcm'
    value: Type_204
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
            new: MultiAddress,
        }),
        sudo: sts.enumStruct({
            call: Call,
        }),
        sudo_as: sts.enumStruct({
            who: MultiAddress,
            call: Call,
        }),
        sudo_unchecked_weight: sts.enumStruct({
            call: Call,
            weight: Weight,
        }),
    }
})

export const MultiAddress: sts.Type<MultiAddress> = sts.closedEnum(() => {
    return  {
        Address20: sts.bytes(),
        Address32: sts.bytes(),
        Id: AccountId32,
        Index: sts.unit(),
        Raw: sts.bytes(),
    }
})

export type MultiAddress = MultiAddress_Address20 | MultiAddress_Address32 | MultiAddress_Id | MultiAddress_Index | MultiAddress_Raw

export interface MultiAddress_Address20 {
    __kind: 'Address20'
    value: Bytes
}

export interface MultiAddress_Address32 {
    __kind: 'Address32'
    value: Bytes
}

export interface MultiAddress_Id {
    __kind: 'Id'
    value: AccountId32
}

export interface MultiAddress_Index {
    __kind: 'Index'
}

export interface MultiAddress_Raw {
    __kind: 'Raw'
    value: Bytes
}

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
    new: MultiAddress
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
    who: MultiAddress
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
export const ProxyCall: sts.Type<ProxyCall> = sts.closedEnum(() => {
    return  {
        add_proxy: sts.enumStruct({
            delegate: MultiAddress,
            proxyType: ProxyType,
            delay: sts.number(),
        }),
        announce: sts.enumStruct({
            real: MultiAddress,
            callHash: H256,
        }),
        create_pure: sts.enumStruct({
            proxyType: ProxyType,
            delay: sts.number(),
            index: sts.number(),
        }),
        kill_pure: sts.enumStruct({
            spawner: MultiAddress,
            proxyType: ProxyType,
            index: sts.number(),
            height: sts.number(),
            extIndex: sts.number(),
        }),
        proxy: sts.enumStruct({
            real: MultiAddress,
            forceProxyType: sts.option(() => ProxyType),
            call: Call,
        }),
        proxy_announced: sts.enumStruct({
            delegate: MultiAddress,
            real: MultiAddress,
            forceProxyType: sts.option(() => ProxyType),
            call: Call,
        }),
        reject_announcement: sts.enumStruct({
            delegate: MultiAddress,
            callHash: H256,
        }),
        remove_announcement: sts.enumStruct({
            real: MultiAddress,
            callHash: H256,
        }),
        remove_proxies: sts.unit(),
        remove_proxy: sts.enumStruct({
            delegate: MultiAddress,
            proxyType: ProxyType,
            delay: sts.number(),
        }),
    }
})

export const H256 = sts.bytes()

export const ProxyType: sts.Type<ProxyType> = sts.closedEnum(() => {
    return  {
        Any: sts.unit(),
        Balances: sts.unit(),
        CancelProxy: sts.unit(),
        Governance: sts.unit(),
        NonTransfer: sts.unit(),
    }
})

export type ProxyType = ProxyType_Any | ProxyType_Balances | ProxyType_CancelProxy | ProxyType_Governance | ProxyType_NonTransfer

export interface ProxyType_Any {
    __kind: 'Any'
}

export interface ProxyType_Balances {
    __kind: 'Balances'
}

export interface ProxyType_CancelProxy {
    __kind: 'CancelProxy'
}

export interface ProxyType_Governance {
    __kind: 'Governance'
}

export interface ProxyType_NonTransfer {
    __kind: 'NonTransfer'
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type ProxyCall = ProxyCall_add_proxy | ProxyCall_announce | ProxyCall_create_pure | ProxyCall_kill_pure | ProxyCall_proxy | ProxyCall_proxy_announced | ProxyCall_reject_announcement | ProxyCall_remove_announcement | ProxyCall_remove_proxies | ProxyCall_remove_proxy

/**
 * Register a proxy account for the sender that is able to make calls on its behalf.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * Parameters:
 * - `proxy`: The account that the `caller` would like to make a proxy.
 * - `proxy_type`: The permissions allowed for this proxy account.
 * - `delay`: The announcement period required of the initial proxy. Will generally be
 * zero.
 */
export interface ProxyCall_add_proxy {
    __kind: 'add_proxy'
    delegate: MultiAddress
    proxyType: ProxyType
    delay: number
}

/**
 * Publish the hash of a proxy-call that will be made in the future.
 * 
 * This must be called some number of blocks before the corresponding `proxy` is attempted
 * if the delay associated with the proxy relationship is greater than zero.
 * 
 * No more than `MaxPending` announcements may be made at any one time.
 * 
 * This will take a deposit of `AnnouncementDepositFactor` as well as
 * `AnnouncementDepositBase` if there are no other pending announcements.
 * 
 * The dispatch origin for this call must be _Signed_ and a proxy of `real`.
 * 
 * Parameters:
 * - `real`: The account that the proxy will make a call on behalf of.
 * - `call_hash`: The hash of the call to be made by the `real` account.
 */
export interface ProxyCall_announce {
    __kind: 'announce'
    real: MultiAddress
    callHash: H256
}

/**
 * Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
 * initialize it with a proxy of `proxy_type` for `origin` sender.
 * 
 * Requires a `Signed` origin.
 * 
 * - `proxy_type`: The type of the proxy that the sender will be registered as over the
 * new account. This will almost always be the most permissive `ProxyType` possible to
 * allow for maximum flexibility.
 * - `index`: A disambiguation index, in case this is called multiple times in the same
 * transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
 * want to use `0`.
 * - `delay`: The announcement period required of the initial proxy. Will generally be
 * zero.
 * 
 * Fails with `Duplicate` if this has already been called in this transaction, from the
 * same sender, with the same parameters.
 * 
 * Fails if there are insufficient funds to pay for deposit.
 */
export interface ProxyCall_create_pure {
    __kind: 'create_pure'
    proxyType: ProxyType
    delay: number
    index: number
}

/**
 * Removes a previously spawned pure proxy.
 * 
 * WARNING: **All access to this account will be lost.** Any funds held in it will be
 * inaccessible.
 * 
 * Requires a `Signed` origin, and the sender account must have been created by a call to
 * `pure` with corresponding parameters.
 * 
 * - `spawner`: The account that originally called `pure` to create this account.
 * - `index`: The disambiguation index originally passed to `pure`. Probably `0`.
 * - `proxy_type`: The proxy type originally passed to `pure`.
 * - `height`: The height of the chain when the call to `pure` was processed.
 * - `ext_index`: The extrinsic index in which the call to `pure` was processed.
 * 
 * Fails with `NoPermission` in case the caller is not a previously created pure
 * account whose `pure` call has corresponding parameters.
 */
export interface ProxyCall_kill_pure {
    __kind: 'kill_pure'
    spawner: MultiAddress
    proxyType: ProxyType
    index: number
    height: number
    extIndex: number
}

/**
 * Dispatch the given `call` from an account that the sender is authorised for through
 * `add_proxy`.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * Parameters:
 * - `real`: The account that the proxy will make a call on behalf of.
 * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
 * - `call`: The call to be made by the `real` account.
 */
export interface ProxyCall_proxy {
    __kind: 'proxy'
    real: MultiAddress
    forceProxyType?: (ProxyType | undefined)
    call: Call
}

/**
 * Dispatch the given `call` from an account that the sender is authorized for through
 * `add_proxy`.
 * 
 * Removes any corresponding announcement(s).
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * Parameters:
 * - `real`: The account that the proxy will make a call on behalf of.
 * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
 * - `call`: The call to be made by the `real` account.
 */
export interface ProxyCall_proxy_announced {
    __kind: 'proxy_announced'
    delegate: MultiAddress
    real: MultiAddress
    forceProxyType?: (ProxyType | undefined)
    call: Call
}

/**
 * Remove the given announcement of a delegate.
 * 
 * May be called by a target (proxied) account to remove a call that one of their delegates
 * (`delegate`) has announced they want to execute. The deposit is returned.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * Parameters:
 * - `delegate`: The account that previously announced the call.
 * - `call_hash`: The hash of the call to be made.
 */
export interface ProxyCall_reject_announcement {
    __kind: 'reject_announcement'
    delegate: MultiAddress
    callHash: H256
}

/**
 * Remove a given announcement.
 * 
 * May be called by a proxy account to remove a call they previously announced and return
 * the deposit.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * Parameters:
 * - `real`: The account that the proxy will make a call on behalf of.
 * - `call_hash`: The hash of the call to be made by the `real` account.
 */
export interface ProxyCall_remove_announcement {
    __kind: 'remove_announcement'
    real: MultiAddress
    callHash: H256
}

/**
 * Unregister all proxy accounts for the sender.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * WARNING: This may be called on accounts created by `pure`, however if done, then
 * the unreserved fees will be inaccessible. **All access to this account will be lost.**
 */
export interface ProxyCall_remove_proxies {
    __kind: 'remove_proxies'
}

/**
 * Unregister a proxy account for the sender.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * Parameters:
 * - `proxy`: The account that the `caller` would like to remove as a proxy.
 * - `proxy_type`: The permissions currently enabled for the removed proxy account.
 */
export interface ProxyCall_remove_proxy {
    __kind: 'remove_proxy'
    delegate: MultiAddress
    proxyType: ProxyType
    delay: number
}

export type H256 = Bytes

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const PolkadotXcmCall: sts.Type<PolkadotXcmCall> = sts.closedEnum(() => {
    return  {
        execute: sts.enumStruct({
            message: Type_262,
            maxWeight: Weight,
        }),
        force_default_xcm_version: sts.enumStruct({
            maybeXcmVersion: sts.option(() => sts.number()),
        }),
        force_subscribe_version_notify: sts.enumStruct({
            location: VersionedMultiLocation,
        }),
        force_suspension: sts.enumStruct({
            suspended: sts.boolean(),
        }),
        force_unsubscribe_version_notify: sts.enumStruct({
            location: VersionedMultiLocation,
        }),
        force_xcm_version: sts.enumStruct({
            location: V3MultiLocation,
            xcmVersion: sts.number(),
        }),
        limited_reserve_transfer_assets: sts.enumStruct({
            dest: VersionedMultiLocation,
            beneficiary: VersionedMultiLocation,
            assets: VersionedMultiAssets,
            feeAssetItem: sts.number(),
            weightLimit: V3WeightLimit,
        }),
        limited_teleport_assets: sts.enumStruct({
            dest: VersionedMultiLocation,
            beneficiary: VersionedMultiLocation,
            assets: VersionedMultiAssets,
            feeAssetItem: sts.number(),
            weightLimit: V3WeightLimit,
        }),
        reserve_transfer_assets: sts.enumStruct({
            dest: VersionedMultiLocation,
            beneficiary: VersionedMultiLocation,
            assets: VersionedMultiAssets,
            feeAssetItem: sts.number(),
        }),
        send: sts.enumStruct({
            dest: VersionedMultiLocation,
            message: VersionedXcm,
        }),
        teleport_assets: sts.enumStruct({
            dest: VersionedMultiLocation,
            beneficiary: VersionedMultiLocation,
            assets: VersionedMultiAssets,
            feeAssetItem: sts.number(),
        }),
    }
})

export const VersionedXcm: sts.Type<VersionedXcm> = sts.closedEnum(() => {
    return  {
        V2: sts.array(() => V2Instruction),
        V3: sts.array(() => V3Instruction),
    }
})

export const V3Instruction: sts.Type<V3Instruction> = sts.closedEnum(() => {
    return  {
        AliasOrigin: V3MultiLocation,
        BurnAsset: sts.array(() => V3MultiAsset),
        BuyExecution: sts.enumStruct({
            fees: V3MultiAsset,
            weightLimit: V3WeightLimit,
        }),
        ClaimAsset: sts.enumStruct({
            assets: sts.array(() => V3MultiAsset),
            ticket: V3MultiLocation,
        }),
        ClearError: sts.unit(),
        ClearOrigin: sts.unit(),
        ClearTopic: sts.unit(),
        ClearTransactStatus: sts.unit(),
        DepositAsset: sts.enumStruct({
            assets: V3MultiAssetFilter,
            beneficiary: V3MultiLocation,
        }),
        DepositReserveAsset: sts.enumStruct({
            assets: V3MultiAssetFilter,
            dest: V3MultiLocation,
            xcm: sts.array(() => V3Instruction),
        }),
        DescendOrigin: V3Junctions,
        ExchangeAsset: sts.enumStruct({
            give: V3MultiAssetFilter,
            want: sts.array(() => V3MultiAsset),
            maximal: sts.boolean(),
        }),
        ExpectAsset: sts.array(() => V3MultiAsset),
        ExpectError: sts.option(() => sts.tuple(() => [sts.number(), V3Error])),
        ExpectOrigin: sts.option(() => V3MultiLocation),
        ExpectPallet: sts.enumStruct({
            index: sts.number(),
            name: sts.bytes(),
            moduleName: sts.bytes(),
            crateMajor: sts.number(),
            minCrateMinor: sts.number(),
        }),
        ExpectTransactStatus: V3MaybeErrorCode,
        ExportMessage: sts.enumStruct({
            network: V3NetworkId,
            destination: V3Junctions,
            xcm: sts.array(() => V3Instruction),
        }),
        HrmpChannelAccepted: sts.enumStruct({
            recipient: sts.number(),
        }),
        HrmpChannelClosing: sts.enumStruct({
            initiator: sts.number(),
            sender: sts.number(),
            recipient: sts.number(),
        }),
        HrmpNewChannelOpenRequest: sts.enumStruct({
            sender: sts.number(),
            maxMessageSize: sts.number(),
            maxCapacity: sts.number(),
        }),
        InitiateReserveWithdraw: sts.enumStruct({
            assets: V3MultiAssetFilter,
            reserve: V3MultiLocation,
            xcm: sts.array(() => V3Instruction),
        }),
        InitiateTeleport: sts.enumStruct({
            assets: V3MultiAssetFilter,
            dest: V3MultiLocation,
            xcm: sts.array(() => V3Instruction),
        }),
        LockAsset: sts.enumStruct({
            asset: V3MultiAsset,
            unlocker: V3MultiLocation,
        }),
        NoteUnlockable: sts.enumStruct({
            asset: V3MultiAsset,
            owner: V3MultiLocation,
        }),
        QueryPallet: sts.enumStruct({
            moduleName: sts.bytes(),
            responseInfo: V3QueryResponseInfo,
        }),
        QueryResponse: sts.enumStruct({
            queryId: sts.bigint(),
            response: V3Response,
            maxWeight: Weight,
            querier: sts.option(() => V3MultiLocation),
        }),
        ReceiveTeleportedAsset: sts.array(() => V3MultiAsset),
        RefundSurplus: sts.unit(),
        ReportError: V3QueryResponseInfo,
        ReportHolding: sts.enumStruct({
            responseInfo: V3QueryResponseInfo,
            assets: V3MultiAssetFilter,
        }),
        ReportTransactStatus: V3QueryResponseInfo,
        RequestUnlock: sts.enumStruct({
            asset: V3MultiAsset,
            locker: V3MultiLocation,
        }),
        ReserveAssetDeposited: sts.array(() => V3MultiAsset),
        SetAppendix: sts.array(() => V3Instruction),
        SetErrorHandler: sts.array(() => V3Instruction),
        SetFeesMode: sts.enumStruct({
            jitWithdraw: sts.boolean(),
        }),
        SetTopic: sts.bytes(),
        SubscribeVersion: sts.enumStruct({
            queryId: sts.bigint(),
            maxResponseWeight: Weight,
        }),
        Transact: sts.enumStruct({
            originKind: V2OriginKind,
            requireWeightAtMost: Weight,
            call: DoubleEncoded,
        }),
        TransferAsset: sts.enumStruct({
            assets: sts.array(() => V3MultiAsset),
            beneficiary: V3MultiLocation,
        }),
        TransferReserveAsset: sts.enumStruct({
            assets: sts.array(() => V3MultiAsset),
            dest: V3MultiLocation,
            xcm: sts.array(() => V3Instruction),
        }),
        Trap: sts.bigint(),
        UniversalOrigin: V3Junction,
        UnlockAsset: sts.enumStruct({
            asset: V3MultiAsset,
            target: V3MultiLocation,
        }),
        UnpaidExecution: sts.enumStruct({
            weightLimit: V3WeightLimit,
            checkOrigin: sts.option(() => V3MultiLocation),
        }),
        UnsubscribeVersion: sts.unit(),
        WithdrawAsset: sts.array(() => V3MultiAsset),
    }
})

export const DoubleEncoded: sts.Type<DoubleEncoded> = sts.struct(() => {
    return  {
        encoded: sts.bytes(),
    }
})

export interface DoubleEncoded {
    encoded: Bytes
}

export const V2OriginKind: sts.Type<V2OriginKind> = sts.closedEnum(() => {
    return  {
        Native: sts.unit(),
        SovereignAccount: sts.unit(),
        Superuser: sts.unit(),
        Xcm: sts.unit(),
    }
})

export type V2OriginKind = V2OriginKind_Native | V2OriginKind_SovereignAccount | V2OriginKind_Superuser | V2OriginKind_Xcm

export interface V2OriginKind_Native {
    __kind: 'Native'
}

export interface V2OriginKind_SovereignAccount {
    __kind: 'SovereignAccount'
}

export interface V2OriginKind_Superuser {
    __kind: 'Superuser'
}

export interface V2OriginKind_Xcm {
    __kind: 'Xcm'
}

export const V3Response: sts.Type<V3Response> = sts.closedEnum(() => {
    return  {
        Assets: sts.array(() => V3MultiAsset),
        DispatchResult: V3MaybeErrorCode,
        ExecutionResult: sts.option(() => sts.tuple(() => [sts.number(), V3Error])),
        Null: sts.unit(),
        PalletsInfo: sts.array(() => V3PalletInfo),
        Version: sts.number(),
    }
})

export const V3PalletInfo: sts.Type<V3PalletInfo> = sts.struct(() => {
    return  {
        index: sts.number(),
        name: sts.bytes(),
        moduleName: sts.bytes(),
        major: sts.number(),
        minor: sts.number(),
        patch: sts.number(),
    }
})

export interface V3PalletInfo {
    index: number
    name: Bytes
    moduleName: Bytes
    major: number
    minor: number
    patch: number
}

export type V3Response = V3Response_Assets | V3Response_DispatchResult | V3Response_ExecutionResult | V3Response_Null | V3Response_PalletsInfo | V3Response_Version

export interface V3Response_Assets {
    __kind: 'Assets'
    value: V3MultiAsset[]
}

export interface V3Response_DispatchResult {
    __kind: 'DispatchResult'
    value: V3MaybeErrorCode
}

export interface V3Response_ExecutionResult {
    __kind: 'ExecutionResult'
    value?: ([number, V3Error] | undefined)
}

export interface V3Response_Null {
    __kind: 'Null'
}

export interface V3Response_PalletsInfo {
    __kind: 'PalletsInfo'
    value: V3PalletInfo[]
}

export interface V3Response_Version {
    __kind: 'Version'
    value: number
}

export type V3Error = V3Error_AssetNotFound | V3Error_BadOrigin | V3Error_Barrier | V3Error_DestinationUnsupported | V3Error_ExceedsMaxMessageSize | V3Error_ExceedsStackLimit | V3Error_ExpectationFalse | V3Error_ExportError | V3Error_FailedToDecode | V3Error_FailedToTransactAsset | V3Error_FeesNotMet | V3Error_HoldingWouldOverflow | V3Error_InvalidLocation | V3Error_LocationCannotHold | V3Error_LocationFull | V3Error_LocationNotInvertible | V3Error_LockError | V3Error_MaxWeightInvalid | V3Error_NameMismatch | V3Error_NoDeal | V3Error_NoPermission | V3Error_NotDepositable | V3Error_NotHoldingFees | V3Error_NotWithdrawable | V3Error_Overflow | V3Error_PalletNotFound | V3Error_ReanchorFailed | V3Error_TooExpensive | V3Error_Transport | V3Error_Trap | V3Error_Unanchored | V3Error_UnhandledXcmVersion | V3Error_Unimplemented | V3Error_UnknownClaim | V3Error_Unroutable | V3Error_UntrustedReserveLocation | V3Error_UntrustedTeleportLocation | V3Error_VersionIncompatible | V3Error_WeightLimitReached | V3Error_WeightNotComputable

export interface V3Error_AssetNotFound {
    __kind: 'AssetNotFound'
}

export interface V3Error_BadOrigin {
    __kind: 'BadOrigin'
}

export interface V3Error_Barrier {
    __kind: 'Barrier'
}

export interface V3Error_DestinationUnsupported {
    __kind: 'DestinationUnsupported'
}

export interface V3Error_ExceedsMaxMessageSize {
    __kind: 'ExceedsMaxMessageSize'
}

export interface V3Error_ExceedsStackLimit {
    __kind: 'ExceedsStackLimit'
}

export interface V3Error_ExpectationFalse {
    __kind: 'ExpectationFalse'
}

export interface V3Error_ExportError {
    __kind: 'ExportError'
}

export interface V3Error_FailedToDecode {
    __kind: 'FailedToDecode'
}

export interface V3Error_FailedToTransactAsset {
    __kind: 'FailedToTransactAsset'
}

export interface V3Error_FeesNotMet {
    __kind: 'FeesNotMet'
}

export interface V3Error_HoldingWouldOverflow {
    __kind: 'HoldingWouldOverflow'
}

export interface V3Error_InvalidLocation {
    __kind: 'InvalidLocation'
}

export interface V3Error_LocationCannotHold {
    __kind: 'LocationCannotHold'
}

export interface V3Error_LocationFull {
    __kind: 'LocationFull'
}

export interface V3Error_LocationNotInvertible {
    __kind: 'LocationNotInvertible'
}

export interface V3Error_LockError {
    __kind: 'LockError'
}

export interface V3Error_MaxWeightInvalid {
    __kind: 'MaxWeightInvalid'
}

export interface V3Error_NameMismatch {
    __kind: 'NameMismatch'
}

export interface V3Error_NoDeal {
    __kind: 'NoDeal'
}

export interface V3Error_NoPermission {
    __kind: 'NoPermission'
}

export interface V3Error_NotDepositable {
    __kind: 'NotDepositable'
}

export interface V3Error_NotHoldingFees {
    __kind: 'NotHoldingFees'
}

export interface V3Error_NotWithdrawable {
    __kind: 'NotWithdrawable'
}

export interface V3Error_Overflow {
    __kind: 'Overflow'
}

export interface V3Error_PalletNotFound {
    __kind: 'PalletNotFound'
}

export interface V3Error_ReanchorFailed {
    __kind: 'ReanchorFailed'
}

export interface V3Error_TooExpensive {
    __kind: 'TooExpensive'
}

export interface V3Error_Transport {
    __kind: 'Transport'
}

export interface V3Error_Trap {
    __kind: 'Trap'
    value: bigint
}

export interface V3Error_Unanchored {
    __kind: 'Unanchored'
}

export interface V3Error_UnhandledXcmVersion {
    __kind: 'UnhandledXcmVersion'
}

export interface V3Error_Unimplemented {
    __kind: 'Unimplemented'
}

export interface V3Error_UnknownClaim {
    __kind: 'UnknownClaim'
}

export interface V3Error_Unroutable {
    __kind: 'Unroutable'
}

export interface V3Error_UntrustedReserveLocation {
    __kind: 'UntrustedReserveLocation'
}

export interface V3Error_UntrustedTeleportLocation {
    __kind: 'UntrustedTeleportLocation'
}

export interface V3Error_VersionIncompatible {
    __kind: 'VersionIncompatible'
}

export interface V3Error_WeightLimitReached {
    __kind: 'WeightLimitReached'
    value: Weight
}

export interface V3Error_WeightNotComputable {
    __kind: 'WeightNotComputable'
}

export type V3MaybeErrorCode = V3MaybeErrorCode_Error | V3MaybeErrorCode_Success | V3MaybeErrorCode_TruncatedError

export interface V3MaybeErrorCode_Error {
    __kind: 'Error'
    value: Bytes
}

export interface V3MaybeErrorCode_Success {
    __kind: 'Success'
}

export interface V3MaybeErrorCode_TruncatedError {
    __kind: 'TruncatedError'
    value: Bytes
}

export interface V3MultiAsset {
    id: V3AssetId
    fun: V3Fungibility
}

export type V3Fungibility = V3Fungibility_Fungible | V3Fungibility_NonFungible

export interface V3Fungibility_Fungible {
    __kind: 'Fungible'
    value: bigint
}

export interface V3Fungibility_NonFungible {
    __kind: 'NonFungible'
    value: V3AssetInstance
}

export type V3AssetInstance = V3AssetInstance_Array16 | V3AssetInstance_Array32 | V3AssetInstance_Array4 | V3AssetInstance_Array8 | V3AssetInstance_Index | V3AssetInstance_Undefined

export interface V3AssetInstance_Array16 {
    __kind: 'Array16'
    value: Bytes
}

export interface V3AssetInstance_Array32 {
    __kind: 'Array32'
    value: Bytes
}

export interface V3AssetInstance_Array4 {
    __kind: 'Array4'
    value: Bytes
}

export interface V3AssetInstance_Array8 {
    __kind: 'Array8'
    value: Bytes
}

export interface V3AssetInstance_Index {
    __kind: 'Index'
    value: bigint
}

export interface V3AssetInstance_Undefined {
    __kind: 'Undefined'
}

export type V3AssetId = V3AssetId_Abstract | V3AssetId_Concrete

export interface V3AssetId_Abstract {
    __kind: 'Abstract'
    value: Bytes
}

export interface V3AssetId_Concrete {
    __kind: 'Concrete'
    value: V3MultiLocation
}

export const V3QueryResponseInfo: sts.Type<V3QueryResponseInfo> = sts.struct(() => {
    return  {
        destination: V3MultiLocation,
        queryId: sts.bigint(),
        maxWeight: Weight,
    }
})

export interface V3QueryResponseInfo {
    destination: V3MultiLocation
    queryId: bigint
    maxWeight: Weight
}

export const V3MaybeErrorCode: sts.Type<V3MaybeErrorCode> = sts.closedEnum(() => {
    return  {
        Error: sts.bytes(),
        Success: sts.unit(),
        TruncatedError: sts.bytes(),
    }
})

export const V3Error: sts.Type<V3Error> = sts.closedEnum(() => {
    return  {
        AssetNotFound: sts.unit(),
        BadOrigin: sts.unit(),
        Barrier: sts.unit(),
        DestinationUnsupported: sts.unit(),
        ExceedsMaxMessageSize: sts.unit(),
        ExceedsStackLimit: sts.unit(),
        ExpectationFalse: sts.unit(),
        ExportError: sts.unit(),
        FailedToDecode: sts.unit(),
        FailedToTransactAsset: sts.unit(),
        FeesNotMet: sts.unit(),
        HoldingWouldOverflow: sts.unit(),
        InvalidLocation: sts.unit(),
        LocationCannotHold: sts.unit(),
        LocationFull: sts.unit(),
        LocationNotInvertible: sts.unit(),
        LockError: sts.unit(),
        MaxWeightInvalid: sts.unit(),
        NameMismatch: sts.unit(),
        NoDeal: sts.unit(),
        NoPermission: sts.unit(),
        NotDepositable: sts.unit(),
        NotHoldingFees: sts.unit(),
        NotWithdrawable: sts.unit(),
        Overflow: sts.unit(),
        PalletNotFound: sts.unit(),
        ReanchorFailed: sts.unit(),
        TooExpensive: sts.unit(),
        Transport: sts.unit(),
        Trap: sts.bigint(),
        Unanchored: sts.unit(),
        UnhandledXcmVersion: sts.unit(),
        Unimplemented: sts.unit(),
        UnknownClaim: sts.unit(),
        Unroutable: sts.unit(),
        UntrustedReserveLocation: sts.unit(),
        UntrustedTeleportLocation: sts.unit(),
        VersionIncompatible: sts.unit(),
        WeightLimitReached: Weight,
        WeightNotComputable: sts.unit(),
    }
})

export const V3MultiAssetFilter: sts.Type<V3MultiAssetFilter> = sts.closedEnum(() => {
    return  {
        Definite: sts.array(() => V3MultiAsset),
        Wild: V3WildMultiAsset,
    }
})

export const V3WildMultiAsset: sts.Type<V3WildMultiAsset> = sts.closedEnum(() => {
    return  {
        All: sts.unit(),
        AllCounted: sts.number(),
        AllOf: sts.enumStruct({
            id: V3AssetId,
            fun: V3WildFungibility,
        }),
        AllOfCounted: sts.enumStruct({
            id: V3AssetId,
            fun: V3WildFungibility,
            count: sts.number(),
        }),
    }
})

export const V3WildFungibility: sts.Type<V3WildFungibility> = sts.closedEnum(() => {
    return  {
        Fungible: sts.unit(),
        NonFungible: sts.unit(),
    }
})

export type V3WildFungibility = V3WildFungibility_Fungible | V3WildFungibility_NonFungible

export interface V3WildFungibility_Fungible {
    __kind: 'Fungible'
}

export interface V3WildFungibility_NonFungible {
    __kind: 'NonFungible'
}

export const V3AssetId: sts.Type<V3AssetId> = sts.closedEnum(() => {
    return  {
        Abstract: sts.bytes(),
        Concrete: V3MultiLocation,
    }
})

export type V3WildMultiAsset = V3WildMultiAsset_All | V3WildMultiAsset_AllCounted | V3WildMultiAsset_AllOf | V3WildMultiAsset_AllOfCounted

export interface V3WildMultiAsset_All {
    __kind: 'All'
}

export interface V3WildMultiAsset_AllCounted {
    __kind: 'AllCounted'
    value: number
}

export interface V3WildMultiAsset_AllOf {
    __kind: 'AllOf'
    id: V3AssetId
    fun: V3WildFungibility
}

export interface V3WildMultiAsset_AllOfCounted {
    __kind: 'AllOfCounted'
    id: V3AssetId
    fun: V3WildFungibility
    count: number
}

export type V3MultiAssetFilter = V3MultiAssetFilter_Definite | V3MultiAssetFilter_Wild

export interface V3MultiAssetFilter_Definite {
    __kind: 'Definite'
    value: V3MultiAsset[]
}

export interface V3MultiAssetFilter_Wild {
    __kind: 'Wild'
    value: V3WildMultiAsset
}

export const V3MultiAsset: sts.Type<V3MultiAsset> = sts.struct(() => {
    return  {
        id: V3AssetId,
        fun: V3Fungibility,
    }
})

export const V3Fungibility: sts.Type<V3Fungibility> = sts.closedEnum(() => {
    return  {
        Fungible: sts.bigint(),
        NonFungible: V3AssetInstance,
    }
})

export const V3AssetInstance: sts.Type<V3AssetInstance> = sts.closedEnum(() => {
    return  {
        Array16: sts.bytes(),
        Array32: sts.bytes(),
        Array4: sts.bytes(),
        Array8: sts.bytes(),
        Index: sts.bigint(),
        Undefined: sts.unit(),
    }
})

export type V3Instruction = V3Instruction_AliasOrigin | V3Instruction_BurnAsset | V3Instruction_BuyExecution | V3Instruction_ClaimAsset | V3Instruction_ClearError | V3Instruction_ClearOrigin | V3Instruction_ClearTopic | V3Instruction_ClearTransactStatus | V3Instruction_DepositAsset | V3Instruction_DepositReserveAsset | V3Instruction_DescendOrigin | V3Instruction_ExchangeAsset | V3Instruction_ExpectAsset | V3Instruction_ExpectError | V3Instruction_ExpectOrigin | V3Instruction_ExpectPallet | V3Instruction_ExpectTransactStatus | V3Instruction_ExportMessage | V3Instruction_HrmpChannelAccepted | V3Instruction_HrmpChannelClosing | V3Instruction_HrmpNewChannelOpenRequest | V3Instruction_InitiateReserveWithdraw | V3Instruction_InitiateTeleport | V3Instruction_LockAsset | V3Instruction_NoteUnlockable | V3Instruction_QueryPallet | V3Instruction_QueryResponse | V3Instruction_ReceiveTeleportedAsset | V3Instruction_RefundSurplus | V3Instruction_ReportError | V3Instruction_ReportHolding | V3Instruction_ReportTransactStatus | V3Instruction_RequestUnlock | V3Instruction_ReserveAssetDeposited | V3Instruction_SetAppendix | V3Instruction_SetErrorHandler | V3Instruction_SetFeesMode | V3Instruction_SetTopic | V3Instruction_SubscribeVersion | V3Instruction_Transact | V3Instruction_TransferAsset | V3Instruction_TransferReserveAsset | V3Instruction_Trap | V3Instruction_UniversalOrigin | V3Instruction_UnlockAsset | V3Instruction_UnpaidExecution | V3Instruction_UnsubscribeVersion | V3Instruction_WithdrawAsset

export interface V3Instruction_AliasOrigin {
    __kind: 'AliasOrigin'
    value: V3MultiLocation
}

export interface V3Instruction_BurnAsset {
    __kind: 'BurnAsset'
    value: V3MultiAsset[]
}

export interface V3Instruction_BuyExecution {
    __kind: 'BuyExecution'
    fees: V3MultiAsset
    weightLimit: V3WeightLimit
}

export interface V3Instruction_ClaimAsset {
    __kind: 'ClaimAsset'
    assets: V3MultiAsset[]
    ticket: V3MultiLocation
}

export interface V3Instruction_ClearError {
    __kind: 'ClearError'
}

export interface V3Instruction_ClearOrigin {
    __kind: 'ClearOrigin'
}

export interface V3Instruction_ClearTopic {
    __kind: 'ClearTopic'
}

export interface V3Instruction_ClearTransactStatus {
    __kind: 'ClearTransactStatus'
}

export interface V3Instruction_DepositAsset {
    __kind: 'DepositAsset'
    assets: V3MultiAssetFilter
    beneficiary: V3MultiLocation
}

export interface V3Instruction_DepositReserveAsset {
    __kind: 'DepositReserveAsset'
    assets: V3MultiAssetFilter
    dest: V3MultiLocation
    xcm: V3Instruction[]
}

export interface V3Instruction_DescendOrigin {
    __kind: 'DescendOrigin'
    value: V3Junctions
}

export interface V3Instruction_ExchangeAsset {
    __kind: 'ExchangeAsset'
    give: V3MultiAssetFilter
    want: V3MultiAsset[]
    maximal: boolean
}

export interface V3Instruction_ExpectAsset {
    __kind: 'ExpectAsset'
    value: V3MultiAsset[]
}

export interface V3Instruction_ExpectError {
    __kind: 'ExpectError'
    value?: ([number, V3Error] | undefined)
}

export interface V3Instruction_ExpectOrigin {
    __kind: 'ExpectOrigin'
    value?: (V3MultiLocation | undefined)
}

export interface V3Instruction_ExpectPallet {
    __kind: 'ExpectPallet'
    index: number
    name: Bytes
    moduleName: Bytes
    crateMajor: number
    minCrateMinor: number
}

export interface V3Instruction_ExpectTransactStatus {
    __kind: 'ExpectTransactStatus'
    value: V3MaybeErrorCode
}

export interface V3Instruction_ExportMessage {
    __kind: 'ExportMessage'
    network: V3NetworkId
    destination: V3Junctions
    xcm: V3Instruction[]
}

export interface V3Instruction_HrmpChannelAccepted {
    __kind: 'HrmpChannelAccepted'
    recipient: number
}

export interface V3Instruction_HrmpChannelClosing {
    __kind: 'HrmpChannelClosing'
    initiator: number
    sender: number
    recipient: number
}

export interface V3Instruction_HrmpNewChannelOpenRequest {
    __kind: 'HrmpNewChannelOpenRequest'
    sender: number
    maxMessageSize: number
    maxCapacity: number
}

export interface V3Instruction_InitiateReserveWithdraw {
    __kind: 'InitiateReserveWithdraw'
    assets: V3MultiAssetFilter
    reserve: V3MultiLocation
    xcm: V3Instruction[]
}

export interface V3Instruction_InitiateTeleport {
    __kind: 'InitiateTeleport'
    assets: V3MultiAssetFilter
    dest: V3MultiLocation
    xcm: V3Instruction[]
}

export interface V3Instruction_LockAsset {
    __kind: 'LockAsset'
    asset: V3MultiAsset
    unlocker: V3MultiLocation
}

export interface V3Instruction_NoteUnlockable {
    __kind: 'NoteUnlockable'
    asset: V3MultiAsset
    owner: V3MultiLocation
}

export interface V3Instruction_QueryPallet {
    __kind: 'QueryPallet'
    moduleName: Bytes
    responseInfo: V3QueryResponseInfo
}

export interface V3Instruction_QueryResponse {
    __kind: 'QueryResponse'
    queryId: bigint
    response: V3Response
    maxWeight: Weight
    querier?: (V3MultiLocation | undefined)
}

export interface V3Instruction_ReceiveTeleportedAsset {
    __kind: 'ReceiveTeleportedAsset'
    value: V3MultiAsset[]
}

export interface V3Instruction_RefundSurplus {
    __kind: 'RefundSurplus'
}

export interface V3Instruction_ReportError {
    __kind: 'ReportError'
    value: V3QueryResponseInfo
}

export interface V3Instruction_ReportHolding {
    __kind: 'ReportHolding'
    responseInfo: V3QueryResponseInfo
    assets: V3MultiAssetFilter
}

export interface V3Instruction_ReportTransactStatus {
    __kind: 'ReportTransactStatus'
    value: V3QueryResponseInfo
}

export interface V3Instruction_RequestUnlock {
    __kind: 'RequestUnlock'
    asset: V3MultiAsset
    locker: V3MultiLocation
}

export interface V3Instruction_ReserveAssetDeposited {
    __kind: 'ReserveAssetDeposited'
    value: V3MultiAsset[]
}

export interface V3Instruction_SetAppendix {
    __kind: 'SetAppendix'
    value: V3Instruction[]
}

export interface V3Instruction_SetErrorHandler {
    __kind: 'SetErrorHandler'
    value: V3Instruction[]
}

export interface V3Instruction_SetFeesMode {
    __kind: 'SetFeesMode'
    jitWithdraw: boolean
}

export interface V3Instruction_SetTopic {
    __kind: 'SetTopic'
    value: Bytes
}

export interface V3Instruction_SubscribeVersion {
    __kind: 'SubscribeVersion'
    queryId: bigint
    maxResponseWeight: Weight
}

export interface V3Instruction_Transact {
    __kind: 'Transact'
    originKind: V2OriginKind
    requireWeightAtMost: Weight
    call: DoubleEncoded
}

export interface V3Instruction_TransferAsset {
    __kind: 'TransferAsset'
    assets: V3MultiAsset[]
    beneficiary: V3MultiLocation
}

export interface V3Instruction_TransferReserveAsset {
    __kind: 'TransferReserveAsset'
    assets: V3MultiAsset[]
    dest: V3MultiLocation
    xcm: V3Instruction[]
}

export interface V3Instruction_Trap {
    __kind: 'Trap'
    value: bigint
}

export interface V3Instruction_UniversalOrigin {
    __kind: 'UniversalOrigin'
    value: V3Junction
}

export interface V3Instruction_UnlockAsset {
    __kind: 'UnlockAsset'
    asset: V3MultiAsset
    target: V3MultiLocation
}

export interface V3Instruction_UnpaidExecution {
    __kind: 'UnpaidExecution'
    weightLimit: V3WeightLimit
    checkOrigin?: (V3MultiLocation | undefined)
}

export interface V3Instruction_UnsubscribeVersion {
    __kind: 'UnsubscribeVersion'
}

export interface V3Instruction_WithdrawAsset {
    __kind: 'WithdrawAsset'
    value: V3MultiAsset[]
}

export type V3WeightLimit = V3WeightLimit_Limited | V3WeightLimit_Unlimited

export interface V3WeightLimit_Limited {
    __kind: 'Limited'
    value: Weight
}

export interface V3WeightLimit_Unlimited {
    __kind: 'Unlimited'
}

export const V2Instruction: sts.Type<V2Instruction> = sts.closedEnum(() => {
    return  {
        BuyExecution: sts.enumStruct({
            fees: V2MultiAsset,
            weightLimit: V2WeightLimit,
        }),
        ClaimAsset: sts.enumStruct({
            assets: sts.array(() => V2MultiAsset),
            ticket: V2MultiLocation,
        }),
        ClearError: sts.unit(),
        ClearOrigin: sts.unit(),
        DepositAsset: sts.enumStruct({
            assets: V2MultiAssetFilter,
            maxAssets: sts.number(),
            beneficiary: V2MultiLocation,
        }),
        DepositReserveAsset: sts.enumStruct({
            assets: V2MultiAssetFilter,
            maxAssets: sts.number(),
            dest: V2MultiLocation,
            xcm: sts.array(() => V2Instruction),
        }),
        DescendOrigin: V2Junctions,
        ExchangeAsset: sts.enumStruct({
            give: V2MultiAssetFilter,
            receive: sts.array(() => V2MultiAsset),
        }),
        HrmpChannelAccepted: sts.enumStruct({
            recipient: sts.number(),
        }),
        HrmpChannelClosing: sts.enumStruct({
            initiator: sts.number(),
            sender: sts.number(),
            recipient: sts.number(),
        }),
        HrmpNewChannelOpenRequest: sts.enumStruct({
            sender: sts.number(),
            maxMessageSize: sts.number(),
            maxCapacity: sts.number(),
        }),
        InitiateReserveWithdraw: sts.enumStruct({
            assets: V2MultiAssetFilter,
            reserve: V2MultiLocation,
            xcm: sts.array(() => V2Instruction),
        }),
        InitiateTeleport: sts.enumStruct({
            assets: V2MultiAssetFilter,
            dest: V2MultiLocation,
            xcm: sts.array(() => V2Instruction),
        }),
        QueryHolding: sts.enumStruct({
            queryId: sts.bigint(),
            dest: V2MultiLocation,
            assets: V2MultiAssetFilter,
            maxResponseWeight: sts.bigint(),
        }),
        QueryResponse: sts.enumStruct({
            queryId: sts.bigint(),
            response: V2Response,
            maxWeight: sts.bigint(),
        }),
        ReceiveTeleportedAsset: sts.array(() => V2MultiAsset),
        RefundSurplus: sts.unit(),
        ReportError: sts.enumStruct({
            queryId: sts.bigint(),
            dest: V2MultiLocation,
            maxResponseWeight: sts.bigint(),
        }),
        ReserveAssetDeposited: sts.array(() => V2MultiAsset),
        SetAppendix: sts.array(() => V2Instruction),
        SetErrorHandler: sts.array(() => V2Instruction),
        SubscribeVersion: sts.enumStruct({
            queryId: sts.bigint(),
            maxResponseWeight: sts.bigint(),
        }),
        Transact: sts.enumStruct({
            originType: V2OriginKind,
            requireWeightAtMost: sts.bigint(),
            call: DoubleEncoded,
        }),
        TransferAsset: sts.enumStruct({
            assets: sts.array(() => V2MultiAsset),
            beneficiary: V2MultiLocation,
        }),
        TransferReserveAsset: sts.enumStruct({
            assets: sts.array(() => V2MultiAsset),
            dest: V2MultiLocation,
            xcm: sts.array(() => V2Instruction),
        }),
        Trap: sts.bigint(),
        UnsubscribeVersion: sts.unit(),
        WithdrawAsset: sts.array(() => V2MultiAsset),
    }
})

export const V2Response: sts.Type<V2Response> = sts.closedEnum(() => {
    return  {
        Assets: sts.array(() => V2MultiAsset),
        ExecutionResult: sts.option(() => sts.tuple(() => [sts.number(), V2Error])),
        Null: sts.unit(),
        Version: sts.number(),
    }
})

export const V2Error: sts.Type<V2Error> = sts.closedEnum(() => {
    return  {
        AssetNotFound: sts.unit(),
        BadOrigin: sts.unit(),
        Barrier: sts.unit(),
        DestinationUnsupported: sts.unit(),
        ExceedsMaxMessageSize: sts.unit(),
        FailedToDecode: sts.unit(),
        FailedToTransactAsset: sts.unit(),
        InvalidLocation: sts.unit(),
        LocationCannotHold: sts.unit(),
        MaxWeightInvalid: sts.unit(),
        MultiLocationFull: sts.unit(),
        MultiLocationNotInvertible: sts.unit(),
        NotHoldingFees: sts.unit(),
        NotWithdrawable: sts.unit(),
        Overflow: sts.unit(),
        TooExpensive: sts.unit(),
        Transport: sts.unit(),
        Trap: sts.bigint(),
        UnhandledXcmVersion: sts.unit(),
        Unimplemented: sts.unit(),
        UnknownClaim: sts.unit(),
        Unroutable: sts.unit(),
        UntrustedReserveLocation: sts.unit(),
        UntrustedTeleportLocation: sts.unit(),
        WeightLimitReached: sts.bigint(),
        WeightNotComputable: sts.unit(),
    }
})

export type V2Error = V2Error_AssetNotFound | V2Error_BadOrigin | V2Error_Barrier | V2Error_DestinationUnsupported | V2Error_ExceedsMaxMessageSize | V2Error_FailedToDecode | V2Error_FailedToTransactAsset | V2Error_InvalidLocation | V2Error_LocationCannotHold | V2Error_MaxWeightInvalid | V2Error_MultiLocationFull | V2Error_MultiLocationNotInvertible | V2Error_NotHoldingFees | V2Error_NotWithdrawable | V2Error_Overflow | V2Error_TooExpensive | V2Error_Transport | V2Error_Trap | V2Error_UnhandledXcmVersion | V2Error_Unimplemented | V2Error_UnknownClaim | V2Error_Unroutable | V2Error_UntrustedReserveLocation | V2Error_UntrustedTeleportLocation | V2Error_WeightLimitReached | V2Error_WeightNotComputable

export interface V2Error_AssetNotFound {
    __kind: 'AssetNotFound'
}

export interface V2Error_BadOrigin {
    __kind: 'BadOrigin'
}

export interface V2Error_Barrier {
    __kind: 'Barrier'
}

export interface V2Error_DestinationUnsupported {
    __kind: 'DestinationUnsupported'
}

export interface V2Error_ExceedsMaxMessageSize {
    __kind: 'ExceedsMaxMessageSize'
}

export interface V2Error_FailedToDecode {
    __kind: 'FailedToDecode'
}

export interface V2Error_FailedToTransactAsset {
    __kind: 'FailedToTransactAsset'
}

export interface V2Error_InvalidLocation {
    __kind: 'InvalidLocation'
}

export interface V2Error_LocationCannotHold {
    __kind: 'LocationCannotHold'
}

export interface V2Error_MaxWeightInvalid {
    __kind: 'MaxWeightInvalid'
}

export interface V2Error_MultiLocationFull {
    __kind: 'MultiLocationFull'
}

export interface V2Error_MultiLocationNotInvertible {
    __kind: 'MultiLocationNotInvertible'
}

export interface V2Error_NotHoldingFees {
    __kind: 'NotHoldingFees'
}

export interface V2Error_NotWithdrawable {
    __kind: 'NotWithdrawable'
}

export interface V2Error_Overflow {
    __kind: 'Overflow'
}

export interface V2Error_TooExpensive {
    __kind: 'TooExpensive'
}

export interface V2Error_Transport {
    __kind: 'Transport'
}

export interface V2Error_Trap {
    __kind: 'Trap'
    value: bigint
}

export interface V2Error_UnhandledXcmVersion {
    __kind: 'UnhandledXcmVersion'
}

export interface V2Error_Unimplemented {
    __kind: 'Unimplemented'
}

export interface V2Error_UnknownClaim {
    __kind: 'UnknownClaim'
}

export interface V2Error_Unroutable {
    __kind: 'Unroutable'
}

export interface V2Error_UntrustedReserveLocation {
    __kind: 'UntrustedReserveLocation'
}

export interface V2Error_UntrustedTeleportLocation {
    __kind: 'UntrustedTeleportLocation'
}

export interface V2Error_WeightLimitReached {
    __kind: 'WeightLimitReached'
    value: bigint
}

export interface V2Error_WeightNotComputable {
    __kind: 'WeightNotComputable'
}

export type V2Response = V2Response_Assets | V2Response_ExecutionResult | V2Response_Null | V2Response_Version

export interface V2Response_Assets {
    __kind: 'Assets'
    value: V2MultiAsset[]
}

export interface V2Response_ExecutionResult {
    __kind: 'ExecutionResult'
    value?: ([number, V2Error] | undefined)
}

export interface V2Response_Null {
    __kind: 'Null'
}

export interface V2Response_Version {
    __kind: 'Version'
    value: number
}

export interface V2MultiAsset {
    id: V2AssetId
    fun: V2Fungibility
}

export type V2Fungibility = V2Fungibility_Fungible | V2Fungibility_NonFungible

export interface V2Fungibility_Fungible {
    __kind: 'Fungible'
    value: bigint
}

export interface V2Fungibility_NonFungible {
    __kind: 'NonFungible'
    value: V2AssetInstance
}

export type V2AssetInstance = V2AssetInstance_Array16 | V2AssetInstance_Array32 | V2AssetInstance_Array4 | V2AssetInstance_Array8 | V2AssetInstance_Blob | V2AssetInstance_Index | V2AssetInstance_Undefined

export interface V2AssetInstance_Array16 {
    __kind: 'Array16'
    value: Bytes
}

export interface V2AssetInstance_Array32 {
    __kind: 'Array32'
    value: Bytes
}

export interface V2AssetInstance_Array4 {
    __kind: 'Array4'
    value: Bytes
}

export interface V2AssetInstance_Array8 {
    __kind: 'Array8'
    value: Bytes
}

export interface V2AssetInstance_Blob {
    __kind: 'Blob'
    value: Bytes
}

export interface V2AssetInstance_Index {
    __kind: 'Index'
    value: bigint
}

export interface V2AssetInstance_Undefined {
    __kind: 'Undefined'
}

export type V2AssetId = V2AssetId_Abstract | V2AssetId_Concrete

export interface V2AssetId_Abstract {
    __kind: 'Abstract'
    value: Bytes
}

export interface V2AssetId_Concrete {
    __kind: 'Concrete'
    value: V2MultiLocation
}

export interface V2MultiLocation {
    parents: number
    interior: V2Junctions
}

export type V2Junctions = V2Junctions_Here | V2Junctions_X1 | V2Junctions_X2 | V2Junctions_X3 | V2Junctions_X4 | V2Junctions_X5 | V2Junctions_X6 | V2Junctions_X7 | V2Junctions_X8

export interface V2Junctions_Here {
    __kind: 'Here'
}

export interface V2Junctions_X1 {
    __kind: 'X1'
    value: V2Junction
}

export interface V2Junctions_X2 {
    __kind: 'X2'
    value: [V2Junction, V2Junction]
}

export interface V2Junctions_X3 {
    __kind: 'X3'
    value: [V2Junction, V2Junction, V2Junction]
}

export interface V2Junctions_X4 {
    __kind: 'X4'
    value: [V2Junction, V2Junction, V2Junction, V2Junction]
}

export interface V2Junctions_X5 {
    __kind: 'X5'
    value: [V2Junction, V2Junction, V2Junction, V2Junction, V2Junction]
}

export interface V2Junctions_X6 {
    __kind: 'X6'
    value: [V2Junction, V2Junction, V2Junction, V2Junction, V2Junction, V2Junction]
}

export interface V2Junctions_X7 {
    __kind: 'X7'
    value: [V2Junction, V2Junction, V2Junction, V2Junction, V2Junction, V2Junction, V2Junction]
}

export interface V2Junctions_X8 {
    __kind: 'X8'
    value: [V2Junction, V2Junction, V2Junction, V2Junction, V2Junction, V2Junction, V2Junction, V2Junction]
}

export type V2Junction = V2Junction_AccountId32 | V2Junction_AccountIndex64 | V2Junction_AccountKey20 | V2Junction_GeneralIndex | V2Junction_GeneralKey | V2Junction_OnlyChild | V2Junction_PalletInstance | V2Junction_Parachain | V2Junction_Plurality

export interface V2Junction_AccountId32 {
    __kind: 'AccountId32'
    network: V2NetworkId
    id: Bytes
}

export interface V2Junction_AccountIndex64 {
    __kind: 'AccountIndex64'
    network: V2NetworkId
    index: bigint
}

export interface V2Junction_AccountKey20 {
    __kind: 'AccountKey20'
    network: V2NetworkId
    key: Bytes
}

export interface V2Junction_GeneralIndex {
    __kind: 'GeneralIndex'
    value: bigint
}

export interface V2Junction_GeneralKey {
    __kind: 'GeneralKey'
    value: WeakBoundedVec
}

export interface V2Junction_OnlyChild {
    __kind: 'OnlyChild'
}

export interface V2Junction_PalletInstance {
    __kind: 'PalletInstance'
    value: number
}

export interface V2Junction_Parachain {
    __kind: 'Parachain'
    value: number
}

export interface V2Junction_Plurality {
    __kind: 'Plurality'
    id: V2BodyId
    part: V2BodyPart
}

export type V2BodyPart = V2BodyPart_AtLeastProportion | V2BodyPart_Fraction | V2BodyPart_Members | V2BodyPart_MoreThanProportion | V2BodyPart_Voice

export interface V2BodyPart_AtLeastProportion {
    __kind: 'AtLeastProportion'
    nom: number
    denom: number
}

export interface V2BodyPart_Fraction {
    __kind: 'Fraction'
    nom: number
    denom: number
}

export interface V2BodyPart_Members {
    __kind: 'Members'
    count: number
}

export interface V2BodyPart_MoreThanProportion {
    __kind: 'MoreThanProportion'
    nom: number
    denom: number
}

export interface V2BodyPart_Voice {
    __kind: 'Voice'
}

export type V2BodyId = V2BodyId_Administration | V2BodyId_Defense | V2BodyId_Executive | V2BodyId_Index | V2BodyId_Judicial | V2BodyId_Legislative | V2BodyId_Named | V2BodyId_Technical | V2BodyId_Treasury | V2BodyId_Unit

export interface V2BodyId_Administration {
    __kind: 'Administration'
}

export interface V2BodyId_Defense {
    __kind: 'Defense'
}

export interface V2BodyId_Executive {
    __kind: 'Executive'
}

export interface V2BodyId_Index {
    __kind: 'Index'
    value: number
}

export interface V2BodyId_Judicial {
    __kind: 'Judicial'
}

export interface V2BodyId_Legislative {
    __kind: 'Legislative'
}

export interface V2BodyId_Named {
    __kind: 'Named'
    value: WeakBoundedVec
}

export interface V2BodyId_Technical {
    __kind: 'Technical'
}

export interface V2BodyId_Treasury {
    __kind: 'Treasury'
}

export interface V2BodyId_Unit {
    __kind: 'Unit'
}

export type WeakBoundedVec = Bytes

export type V2NetworkId = V2NetworkId_Any | V2NetworkId_Kusama | V2NetworkId_Named | V2NetworkId_Polkadot

export interface V2NetworkId_Any {
    __kind: 'Any'
}

export interface V2NetworkId_Kusama {
    __kind: 'Kusama'
}

export interface V2NetworkId_Named {
    __kind: 'Named'
    value: WeakBoundedVec
}

export interface V2NetworkId_Polkadot {
    __kind: 'Polkadot'
}

export const V2Junctions: sts.Type<V2Junctions> = sts.closedEnum(() => {
    return  {
        Here: sts.unit(),
        X1: V2Junction,
        X2: sts.tuple(() => [V2Junction, V2Junction]),
        X3: sts.tuple(() => [V2Junction, V2Junction, V2Junction]),
        X4: sts.tuple(() => [V2Junction, V2Junction, V2Junction, V2Junction]),
        X5: sts.tuple(() => [V2Junction, V2Junction, V2Junction, V2Junction, V2Junction]),
        X6: sts.tuple(() => [V2Junction, V2Junction, V2Junction, V2Junction, V2Junction, V2Junction]),
        X7: sts.tuple(() => [V2Junction, V2Junction, V2Junction, V2Junction, V2Junction, V2Junction, V2Junction]),
        X8: sts.tuple(() => [V2Junction, V2Junction, V2Junction, V2Junction, V2Junction, V2Junction, V2Junction, V2Junction]),
    }
})

export const V2Junction: sts.Type<V2Junction> = sts.closedEnum(() => {
    return  {
        AccountId32: sts.enumStruct({
            network: V2NetworkId,
            id: sts.bytes(),
        }),
        AccountIndex64: sts.enumStruct({
            network: V2NetworkId,
            index: sts.bigint(),
        }),
        AccountKey20: sts.enumStruct({
            network: V2NetworkId,
            key: sts.bytes(),
        }),
        GeneralIndex: sts.bigint(),
        GeneralKey: WeakBoundedVec,
        OnlyChild: sts.unit(),
        PalletInstance: sts.number(),
        Parachain: sts.number(),
        Plurality: sts.enumStruct({
            id: V2BodyId,
            part: V2BodyPart,
        }),
    }
})

export const V2BodyPart: sts.Type<V2BodyPart> = sts.closedEnum(() => {
    return  {
        AtLeastProportion: sts.enumStruct({
            nom: sts.number(),
            denom: sts.number(),
        }),
        Fraction: sts.enumStruct({
            nom: sts.number(),
            denom: sts.number(),
        }),
        Members: sts.enumStruct({
            count: sts.number(),
        }),
        MoreThanProportion: sts.enumStruct({
            nom: sts.number(),
            denom: sts.number(),
        }),
        Voice: sts.unit(),
    }
})

export const V2BodyId: sts.Type<V2BodyId> = sts.closedEnum(() => {
    return  {
        Administration: sts.unit(),
        Defense: sts.unit(),
        Executive: sts.unit(),
        Index: sts.number(),
        Judicial: sts.unit(),
        Legislative: sts.unit(),
        Named: WeakBoundedVec,
        Technical: sts.unit(),
        Treasury: sts.unit(),
        Unit: sts.unit(),
    }
})

export const WeakBoundedVec = sts.bytes()

export const V2NetworkId: sts.Type<V2NetworkId> = sts.closedEnum(() => {
    return  {
        Any: sts.unit(),
        Kusama: sts.unit(),
        Named: WeakBoundedVec,
        Polkadot: sts.unit(),
    }
})

export const V2MultiAssetFilter: sts.Type<V2MultiAssetFilter> = sts.closedEnum(() => {
    return  {
        Definite: sts.array(() => V2MultiAsset),
        Wild: V2WildMultiAsset,
    }
})

export const V2WildMultiAsset: sts.Type<V2WildMultiAsset> = sts.closedEnum(() => {
    return  {
        All: sts.unit(),
        AllOf: sts.enumStruct({
            id: V2AssetId,
            fun: V2WildFungibility,
        }),
    }
})

export const V2WildFungibility: sts.Type<V2WildFungibility> = sts.closedEnum(() => {
    return  {
        Fungible: sts.unit(),
        NonFungible: sts.unit(),
    }
})

export type V2WildFungibility = V2WildFungibility_Fungible | V2WildFungibility_NonFungible

export interface V2WildFungibility_Fungible {
    __kind: 'Fungible'
}

export interface V2WildFungibility_NonFungible {
    __kind: 'NonFungible'
}

export const V2AssetId: sts.Type<V2AssetId> = sts.closedEnum(() => {
    return  {
        Abstract: sts.bytes(),
        Concrete: V2MultiLocation,
    }
})

export type V2WildMultiAsset = V2WildMultiAsset_All | V2WildMultiAsset_AllOf

export interface V2WildMultiAsset_All {
    __kind: 'All'
}

export interface V2WildMultiAsset_AllOf {
    __kind: 'AllOf'
    id: V2AssetId
    fun: V2WildFungibility
}

export type V2MultiAssetFilter = V2MultiAssetFilter_Definite | V2MultiAssetFilter_Wild

export interface V2MultiAssetFilter_Definite {
    __kind: 'Definite'
    value: V2MultiAsset[]
}

export interface V2MultiAssetFilter_Wild {
    __kind: 'Wild'
    value: V2WildMultiAsset
}

export const V2MultiLocation: sts.Type<V2MultiLocation> = sts.struct(() => {
    return  {
        parents: sts.number(),
        interior: V2Junctions,
    }
})

export const V2WeightLimit: sts.Type<V2WeightLimit> = sts.closedEnum(() => {
    return  {
        Limited: sts.bigint(),
        Unlimited: sts.unit(),
    }
})

export type V2WeightLimit = V2WeightLimit_Limited | V2WeightLimit_Unlimited

export interface V2WeightLimit_Limited {
    __kind: 'Limited'
    value: bigint
}

export interface V2WeightLimit_Unlimited {
    __kind: 'Unlimited'
}

export const V2MultiAsset: sts.Type<V2MultiAsset> = sts.struct(() => {
    return  {
        id: V2AssetId,
        fun: V2Fungibility,
    }
})

export const V2Fungibility: sts.Type<V2Fungibility> = sts.closedEnum(() => {
    return  {
        Fungible: sts.bigint(),
        NonFungible: V2AssetInstance,
    }
})

export const V2AssetInstance: sts.Type<V2AssetInstance> = sts.closedEnum(() => {
    return  {
        Array16: sts.bytes(),
        Array32: sts.bytes(),
        Array4: sts.bytes(),
        Array8: sts.bytes(),
        Blob: sts.bytes(),
        Index: sts.bigint(),
        Undefined: sts.unit(),
    }
})

export type V2Instruction = V2Instruction_BuyExecution | V2Instruction_ClaimAsset | V2Instruction_ClearError | V2Instruction_ClearOrigin | V2Instruction_DepositAsset | V2Instruction_DepositReserveAsset | V2Instruction_DescendOrigin | V2Instruction_ExchangeAsset | V2Instruction_HrmpChannelAccepted | V2Instruction_HrmpChannelClosing | V2Instruction_HrmpNewChannelOpenRequest | V2Instruction_InitiateReserveWithdraw | V2Instruction_InitiateTeleport | V2Instruction_QueryHolding | V2Instruction_QueryResponse | V2Instruction_ReceiveTeleportedAsset | V2Instruction_RefundSurplus | V2Instruction_ReportError | V2Instruction_ReserveAssetDeposited | V2Instruction_SetAppendix | V2Instruction_SetErrorHandler | V2Instruction_SubscribeVersion | V2Instruction_Transact | V2Instruction_TransferAsset | V2Instruction_TransferReserveAsset | V2Instruction_Trap | V2Instruction_UnsubscribeVersion | V2Instruction_WithdrawAsset

export interface V2Instruction_BuyExecution {
    __kind: 'BuyExecution'
    fees: V2MultiAsset
    weightLimit: V2WeightLimit
}

export interface V2Instruction_ClaimAsset {
    __kind: 'ClaimAsset'
    assets: V2MultiAsset[]
    ticket: V2MultiLocation
}

export interface V2Instruction_ClearError {
    __kind: 'ClearError'
}

export interface V2Instruction_ClearOrigin {
    __kind: 'ClearOrigin'
}

export interface V2Instruction_DepositAsset {
    __kind: 'DepositAsset'
    assets: V2MultiAssetFilter
    maxAssets: number
    beneficiary: V2MultiLocation
}

export interface V2Instruction_DepositReserveAsset {
    __kind: 'DepositReserveAsset'
    assets: V2MultiAssetFilter
    maxAssets: number
    dest: V2MultiLocation
    xcm: V2Instruction[]
}

export interface V2Instruction_DescendOrigin {
    __kind: 'DescendOrigin'
    value: V2Junctions
}

export interface V2Instruction_ExchangeAsset {
    __kind: 'ExchangeAsset'
    give: V2MultiAssetFilter
    receive: V2MultiAsset[]
}

export interface V2Instruction_HrmpChannelAccepted {
    __kind: 'HrmpChannelAccepted'
    recipient: number
}

export interface V2Instruction_HrmpChannelClosing {
    __kind: 'HrmpChannelClosing'
    initiator: number
    sender: number
    recipient: number
}

export interface V2Instruction_HrmpNewChannelOpenRequest {
    __kind: 'HrmpNewChannelOpenRequest'
    sender: number
    maxMessageSize: number
    maxCapacity: number
}

export interface V2Instruction_InitiateReserveWithdraw {
    __kind: 'InitiateReserveWithdraw'
    assets: V2MultiAssetFilter
    reserve: V2MultiLocation
    xcm: V2Instruction[]
}

export interface V2Instruction_InitiateTeleport {
    __kind: 'InitiateTeleport'
    assets: V2MultiAssetFilter
    dest: V2MultiLocation
    xcm: V2Instruction[]
}

export interface V2Instruction_QueryHolding {
    __kind: 'QueryHolding'
    queryId: bigint
    dest: V2MultiLocation
    assets: V2MultiAssetFilter
    maxResponseWeight: bigint
}

export interface V2Instruction_QueryResponse {
    __kind: 'QueryResponse'
    queryId: bigint
    response: V2Response
    maxWeight: bigint
}

export interface V2Instruction_ReceiveTeleportedAsset {
    __kind: 'ReceiveTeleportedAsset'
    value: V2MultiAsset[]
}

export interface V2Instruction_RefundSurplus {
    __kind: 'RefundSurplus'
}

export interface V2Instruction_ReportError {
    __kind: 'ReportError'
    queryId: bigint
    dest: V2MultiLocation
    maxResponseWeight: bigint
}

export interface V2Instruction_ReserveAssetDeposited {
    __kind: 'ReserveAssetDeposited'
    value: V2MultiAsset[]
}

export interface V2Instruction_SetAppendix {
    __kind: 'SetAppendix'
    value: V2Instruction[]
}

export interface V2Instruction_SetErrorHandler {
    __kind: 'SetErrorHandler'
    value: V2Instruction[]
}

export interface V2Instruction_SubscribeVersion {
    __kind: 'SubscribeVersion'
    queryId: bigint
    maxResponseWeight: bigint
}

export interface V2Instruction_Transact {
    __kind: 'Transact'
    originType: V2OriginKind
    requireWeightAtMost: bigint
    call: DoubleEncoded
}

export interface V2Instruction_TransferAsset {
    __kind: 'TransferAsset'
    assets: V2MultiAsset[]
    beneficiary: V2MultiLocation
}

export interface V2Instruction_TransferReserveAsset {
    __kind: 'TransferReserveAsset'
    assets: V2MultiAsset[]
    dest: V2MultiLocation
    xcm: V2Instruction[]
}

export interface V2Instruction_Trap {
    __kind: 'Trap'
    value: bigint
}

export interface V2Instruction_UnsubscribeVersion {
    __kind: 'UnsubscribeVersion'
}

export interface V2Instruction_WithdrawAsset {
    __kind: 'WithdrawAsset'
    value: V2MultiAsset[]
}

export type VersionedXcm = VersionedXcm_V2 | VersionedXcm_V3

export interface VersionedXcm_V2 {
    __kind: 'V2'
    value: V2Instruction[]
}

export interface VersionedXcm_V3 {
    __kind: 'V3'
    value: V3Instruction[]
}

export const V3WeightLimit: sts.Type<V3WeightLimit> = sts.closedEnum(() => {
    return  {
        Limited: Weight,
        Unlimited: sts.unit(),
    }
})

export const VersionedMultiAssets: sts.Type<VersionedMultiAssets> = sts.closedEnum(() => {
    return  {
        V2: sts.array(() => V2MultiAsset),
        V3: sts.array(() => V3MultiAsset),
    }
})

export type VersionedMultiAssets = VersionedMultiAssets_V2 | VersionedMultiAssets_V3

export interface VersionedMultiAssets_V2 {
    __kind: 'V2'
    value: V2MultiAsset[]
}

export interface VersionedMultiAssets_V3 {
    __kind: 'V3'
    value: V3MultiAsset[]
}

export const VersionedMultiLocation: sts.Type<VersionedMultiLocation> = sts.closedEnum(() => {
    return  {
        V2: V2MultiLocation,
        V3: V3MultiLocation,
    }
})

export type VersionedMultiLocation = VersionedMultiLocation_V2 | VersionedMultiLocation_V3

export interface VersionedMultiLocation_V2 {
    __kind: 'V2'
    value: V2MultiLocation
}

export interface VersionedMultiLocation_V3 {
    __kind: 'V3'
    value: V3MultiLocation
}

export const Type_262: sts.Type<Type_262> = sts.closedEnum(() => {
    return  {
        V2: sts.array(() => Type_265),
        V3: sts.array(() => Type_269),
    }
})

export const Type_269: sts.Type<Type_269> = sts.closedEnum(() => {
    return  {
        AliasOrigin: V3MultiLocation,
        BurnAsset: sts.array(() => V3MultiAsset),
        BuyExecution: sts.enumStruct({
            fees: V3MultiAsset,
            weightLimit: V3WeightLimit,
        }),
        ClaimAsset: sts.enumStruct({
            assets: sts.array(() => V3MultiAsset),
            ticket: V3MultiLocation,
        }),
        ClearError: sts.unit(),
        ClearOrigin: sts.unit(),
        ClearTopic: sts.unit(),
        ClearTransactStatus: sts.unit(),
        DepositAsset: sts.enumStruct({
            assets: V3MultiAssetFilter,
            beneficiary: V3MultiLocation,
        }),
        DepositReserveAsset: sts.enumStruct({
            assets: V3MultiAssetFilter,
            dest: V3MultiLocation,
            xcm: sts.array(() => V3Instruction),
        }),
        DescendOrigin: V3Junctions,
        ExchangeAsset: sts.enumStruct({
            give: V3MultiAssetFilter,
            want: sts.array(() => V3MultiAsset),
            maximal: sts.boolean(),
        }),
        ExpectAsset: sts.array(() => V3MultiAsset),
        ExpectError: sts.option(() => sts.tuple(() => [sts.number(), V3Error])),
        ExpectOrigin: sts.option(() => V3MultiLocation),
        ExpectPallet: sts.enumStruct({
            index: sts.number(),
            name: sts.bytes(),
            moduleName: sts.bytes(),
            crateMajor: sts.number(),
            minCrateMinor: sts.number(),
        }),
        ExpectTransactStatus: V3MaybeErrorCode,
        ExportMessage: sts.enumStruct({
            network: V3NetworkId,
            destination: V3Junctions,
            xcm: sts.array(() => V3Instruction),
        }),
        HrmpChannelAccepted: sts.enumStruct({
            recipient: sts.number(),
        }),
        HrmpChannelClosing: sts.enumStruct({
            initiator: sts.number(),
            sender: sts.number(),
            recipient: sts.number(),
        }),
        HrmpNewChannelOpenRequest: sts.enumStruct({
            sender: sts.number(),
            maxMessageSize: sts.number(),
            maxCapacity: sts.number(),
        }),
        InitiateReserveWithdraw: sts.enumStruct({
            assets: V3MultiAssetFilter,
            reserve: V3MultiLocation,
            xcm: sts.array(() => V3Instruction),
        }),
        InitiateTeleport: sts.enumStruct({
            assets: V3MultiAssetFilter,
            dest: V3MultiLocation,
            xcm: sts.array(() => V3Instruction),
        }),
        LockAsset: sts.enumStruct({
            asset: V3MultiAsset,
            unlocker: V3MultiLocation,
        }),
        NoteUnlockable: sts.enumStruct({
            asset: V3MultiAsset,
            owner: V3MultiLocation,
        }),
        QueryPallet: sts.enumStruct({
            moduleName: sts.bytes(),
            responseInfo: V3QueryResponseInfo,
        }),
        QueryResponse: sts.enumStruct({
            queryId: sts.bigint(),
            response: V3Response,
            maxWeight: Weight,
            querier: sts.option(() => V3MultiLocation),
        }),
        ReceiveTeleportedAsset: sts.array(() => V3MultiAsset),
        RefundSurplus: sts.unit(),
        ReportError: V3QueryResponseInfo,
        ReportHolding: sts.enumStruct({
            responseInfo: V3QueryResponseInfo,
            assets: V3MultiAssetFilter,
        }),
        ReportTransactStatus: V3QueryResponseInfo,
        RequestUnlock: sts.enumStruct({
            asset: V3MultiAsset,
            locker: V3MultiLocation,
        }),
        ReserveAssetDeposited: sts.array(() => V3MultiAsset),
        SetAppendix: sts.array(() => Type_269),
        SetErrorHandler: sts.array(() => Type_269),
        SetFeesMode: sts.enumStruct({
            jitWithdraw: sts.boolean(),
        }),
        SetTopic: sts.bytes(),
        SubscribeVersion: sts.enumStruct({
            queryId: sts.bigint(),
            maxResponseWeight: Weight,
        }),
        Transact: sts.enumStruct({
            originKind: V2OriginKind,
            requireWeightAtMost: Weight,
            call: Type_266,
        }),
        TransferAsset: sts.enumStruct({
            assets: sts.array(() => V3MultiAsset),
            beneficiary: V3MultiLocation,
        }),
        TransferReserveAsset: sts.enumStruct({
            assets: sts.array(() => V3MultiAsset),
            dest: V3MultiLocation,
            xcm: sts.array(() => V3Instruction),
        }),
        Trap: sts.bigint(),
        UniversalOrigin: V3Junction,
        UnlockAsset: sts.enumStruct({
            asset: V3MultiAsset,
            target: V3MultiLocation,
        }),
        UnpaidExecution: sts.enumStruct({
            weightLimit: V3WeightLimit,
            checkOrigin: sts.option(() => V3MultiLocation),
        }),
        UnsubscribeVersion: sts.unit(),
        WithdrawAsset: sts.array(() => V3MultiAsset),
    }
})

export const Type_266: sts.Type<Type_266> = sts.struct(() => {
    return  {
        encoded: sts.bytes(),
    }
})

export interface Type_266 {
    encoded: Bytes
}

export type Type_269 = Type_269_AliasOrigin | Type_269_BurnAsset | Type_269_BuyExecution | Type_269_ClaimAsset | Type_269_ClearError | Type_269_ClearOrigin | Type_269_ClearTopic | Type_269_ClearTransactStatus | Type_269_DepositAsset | Type_269_DepositReserveAsset | Type_269_DescendOrigin | Type_269_ExchangeAsset | Type_269_ExpectAsset | Type_269_ExpectError | Type_269_ExpectOrigin | Type_269_ExpectPallet | Type_269_ExpectTransactStatus | Type_269_ExportMessage | Type_269_HrmpChannelAccepted | Type_269_HrmpChannelClosing | Type_269_HrmpNewChannelOpenRequest | Type_269_InitiateReserveWithdraw | Type_269_InitiateTeleport | Type_269_LockAsset | Type_269_NoteUnlockable | Type_269_QueryPallet | Type_269_QueryResponse | Type_269_ReceiveTeleportedAsset | Type_269_RefundSurplus | Type_269_ReportError | Type_269_ReportHolding | Type_269_ReportTransactStatus | Type_269_RequestUnlock | Type_269_ReserveAssetDeposited | Type_269_SetAppendix | Type_269_SetErrorHandler | Type_269_SetFeesMode | Type_269_SetTopic | Type_269_SubscribeVersion | Type_269_Transact | Type_269_TransferAsset | Type_269_TransferReserveAsset | Type_269_Trap | Type_269_UniversalOrigin | Type_269_UnlockAsset | Type_269_UnpaidExecution | Type_269_UnsubscribeVersion | Type_269_WithdrawAsset

export interface Type_269_AliasOrigin {
    __kind: 'AliasOrigin'
    value: V3MultiLocation
}

export interface Type_269_BurnAsset {
    __kind: 'BurnAsset'
    value: V3MultiAsset[]
}

export interface Type_269_BuyExecution {
    __kind: 'BuyExecution'
    fees: V3MultiAsset
    weightLimit: V3WeightLimit
}

export interface Type_269_ClaimAsset {
    __kind: 'ClaimAsset'
    assets: V3MultiAsset[]
    ticket: V3MultiLocation
}

export interface Type_269_ClearError {
    __kind: 'ClearError'
}

export interface Type_269_ClearOrigin {
    __kind: 'ClearOrigin'
}

export interface Type_269_ClearTopic {
    __kind: 'ClearTopic'
}

export interface Type_269_ClearTransactStatus {
    __kind: 'ClearTransactStatus'
}

export interface Type_269_DepositAsset {
    __kind: 'DepositAsset'
    assets: V3MultiAssetFilter
    beneficiary: V3MultiLocation
}

export interface Type_269_DepositReserveAsset {
    __kind: 'DepositReserveAsset'
    assets: V3MultiAssetFilter
    dest: V3MultiLocation
    xcm: V3Instruction[]
}

export interface Type_269_DescendOrigin {
    __kind: 'DescendOrigin'
    value: V3Junctions
}

export interface Type_269_ExchangeAsset {
    __kind: 'ExchangeAsset'
    give: V3MultiAssetFilter
    want: V3MultiAsset[]
    maximal: boolean
}

export interface Type_269_ExpectAsset {
    __kind: 'ExpectAsset'
    value: V3MultiAsset[]
}

export interface Type_269_ExpectError {
    __kind: 'ExpectError'
    value?: ([number, V3Error] | undefined)
}

export interface Type_269_ExpectOrigin {
    __kind: 'ExpectOrigin'
    value?: (V3MultiLocation | undefined)
}

export interface Type_269_ExpectPallet {
    __kind: 'ExpectPallet'
    index: number
    name: Bytes
    moduleName: Bytes
    crateMajor: number
    minCrateMinor: number
}

export interface Type_269_ExpectTransactStatus {
    __kind: 'ExpectTransactStatus'
    value: V3MaybeErrorCode
}

export interface Type_269_ExportMessage {
    __kind: 'ExportMessage'
    network: V3NetworkId
    destination: V3Junctions
    xcm: V3Instruction[]
}

export interface Type_269_HrmpChannelAccepted {
    __kind: 'HrmpChannelAccepted'
    recipient: number
}

export interface Type_269_HrmpChannelClosing {
    __kind: 'HrmpChannelClosing'
    initiator: number
    sender: number
    recipient: number
}

export interface Type_269_HrmpNewChannelOpenRequest {
    __kind: 'HrmpNewChannelOpenRequest'
    sender: number
    maxMessageSize: number
    maxCapacity: number
}

export interface Type_269_InitiateReserveWithdraw {
    __kind: 'InitiateReserveWithdraw'
    assets: V3MultiAssetFilter
    reserve: V3MultiLocation
    xcm: V3Instruction[]
}

export interface Type_269_InitiateTeleport {
    __kind: 'InitiateTeleport'
    assets: V3MultiAssetFilter
    dest: V3MultiLocation
    xcm: V3Instruction[]
}

export interface Type_269_LockAsset {
    __kind: 'LockAsset'
    asset: V3MultiAsset
    unlocker: V3MultiLocation
}

export interface Type_269_NoteUnlockable {
    __kind: 'NoteUnlockable'
    asset: V3MultiAsset
    owner: V3MultiLocation
}

export interface Type_269_QueryPallet {
    __kind: 'QueryPallet'
    moduleName: Bytes
    responseInfo: V3QueryResponseInfo
}

export interface Type_269_QueryResponse {
    __kind: 'QueryResponse'
    queryId: bigint
    response: V3Response
    maxWeight: Weight
    querier?: (V3MultiLocation | undefined)
}

export interface Type_269_ReceiveTeleportedAsset {
    __kind: 'ReceiveTeleportedAsset'
    value: V3MultiAsset[]
}

export interface Type_269_RefundSurplus {
    __kind: 'RefundSurplus'
}

export interface Type_269_ReportError {
    __kind: 'ReportError'
    value: V3QueryResponseInfo
}

export interface Type_269_ReportHolding {
    __kind: 'ReportHolding'
    responseInfo: V3QueryResponseInfo
    assets: V3MultiAssetFilter
}

export interface Type_269_ReportTransactStatus {
    __kind: 'ReportTransactStatus'
    value: V3QueryResponseInfo
}

export interface Type_269_RequestUnlock {
    __kind: 'RequestUnlock'
    asset: V3MultiAsset
    locker: V3MultiLocation
}

export interface Type_269_ReserveAssetDeposited {
    __kind: 'ReserveAssetDeposited'
    value: V3MultiAsset[]
}

export interface Type_269_SetAppendix {
    __kind: 'SetAppendix'
    value: Type_269[]
}

export interface Type_269_SetErrorHandler {
    __kind: 'SetErrorHandler'
    value: Type_269[]
}

export interface Type_269_SetFeesMode {
    __kind: 'SetFeesMode'
    jitWithdraw: boolean
}

export interface Type_269_SetTopic {
    __kind: 'SetTopic'
    value: Bytes
}

export interface Type_269_SubscribeVersion {
    __kind: 'SubscribeVersion'
    queryId: bigint
    maxResponseWeight: Weight
}

export interface Type_269_Transact {
    __kind: 'Transact'
    originKind: V2OriginKind
    requireWeightAtMost: Weight
    call: Type_266
}

export interface Type_269_TransferAsset {
    __kind: 'TransferAsset'
    assets: V3MultiAsset[]
    beneficiary: V3MultiLocation
}

export interface Type_269_TransferReserveAsset {
    __kind: 'TransferReserveAsset'
    assets: V3MultiAsset[]
    dest: V3MultiLocation
    xcm: V3Instruction[]
}

export interface Type_269_Trap {
    __kind: 'Trap'
    value: bigint
}

export interface Type_269_UniversalOrigin {
    __kind: 'UniversalOrigin'
    value: V3Junction
}

export interface Type_269_UnlockAsset {
    __kind: 'UnlockAsset'
    asset: V3MultiAsset
    target: V3MultiLocation
}

export interface Type_269_UnpaidExecution {
    __kind: 'UnpaidExecution'
    weightLimit: V3WeightLimit
    checkOrigin?: (V3MultiLocation | undefined)
}

export interface Type_269_UnsubscribeVersion {
    __kind: 'UnsubscribeVersion'
}

export interface Type_269_WithdrawAsset {
    __kind: 'WithdrawAsset'
    value: V3MultiAsset[]
}

export const Type_265: sts.Type<Type_265> = sts.closedEnum(() => {
    return  {
        BuyExecution: sts.enumStruct({
            fees: V2MultiAsset,
            weightLimit: V2WeightLimit,
        }),
        ClaimAsset: sts.enumStruct({
            assets: sts.array(() => V2MultiAsset),
            ticket: V2MultiLocation,
        }),
        ClearError: sts.unit(),
        ClearOrigin: sts.unit(),
        DepositAsset: sts.enumStruct({
            assets: V2MultiAssetFilter,
            maxAssets: sts.number(),
            beneficiary: V2MultiLocation,
        }),
        DepositReserveAsset: sts.enumStruct({
            assets: V2MultiAssetFilter,
            maxAssets: sts.number(),
            dest: V2MultiLocation,
            xcm: sts.array(() => V2Instruction),
        }),
        DescendOrigin: V2Junctions,
        ExchangeAsset: sts.enumStruct({
            give: V2MultiAssetFilter,
            receive: sts.array(() => V2MultiAsset),
        }),
        HrmpChannelAccepted: sts.enumStruct({
            recipient: sts.number(),
        }),
        HrmpChannelClosing: sts.enumStruct({
            initiator: sts.number(),
            sender: sts.number(),
            recipient: sts.number(),
        }),
        HrmpNewChannelOpenRequest: sts.enumStruct({
            sender: sts.number(),
            maxMessageSize: sts.number(),
            maxCapacity: sts.number(),
        }),
        InitiateReserveWithdraw: sts.enumStruct({
            assets: V2MultiAssetFilter,
            reserve: V2MultiLocation,
            xcm: sts.array(() => V2Instruction),
        }),
        InitiateTeleport: sts.enumStruct({
            assets: V2MultiAssetFilter,
            dest: V2MultiLocation,
            xcm: sts.array(() => V2Instruction),
        }),
        QueryHolding: sts.enumStruct({
            queryId: sts.bigint(),
            dest: V2MultiLocation,
            assets: V2MultiAssetFilter,
            maxResponseWeight: sts.bigint(),
        }),
        QueryResponse: sts.enumStruct({
            queryId: sts.bigint(),
            response: V2Response,
            maxWeight: sts.bigint(),
        }),
        ReceiveTeleportedAsset: sts.array(() => V2MultiAsset),
        RefundSurplus: sts.unit(),
        ReportError: sts.enumStruct({
            queryId: sts.bigint(),
            dest: V2MultiLocation,
            maxResponseWeight: sts.bigint(),
        }),
        ReserveAssetDeposited: sts.array(() => V2MultiAsset),
        SetAppendix: sts.array(() => Type_265),
        SetErrorHandler: sts.array(() => Type_265),
        SubscribeVersion: sts.enumStruct({
            queryId: sts.bigint(),
            maxResponseWeight: sts.bigint(),
        }),
        Transact: sts.enumStruct({
            originType: V2OriginKind,
            requireWeightAtMost: sts.bigint(),
            call: Type_266,
        }),
        TransferAsset: sts.enumStruct({
            assets: sts.array(() => V2MultiAsset),
            beneficiary: V2MultiLocation,
        }),
        TransferReserveAsset: sts.enumStruct({
            assets: sts.array(() => V2MultiAsset),
            dest: V2MultiLocation,
            xcm: sts.array(() => V2Instruction),
        }),
        Trap: sts.bigint(),
        UnsubscribeVersion: sts.unit(),
        WithdrawAsset: sts.array(() => V2MultiAsset),
    }
})

export type Type_265 = Type_265_BuyExecution | Type_265_ClaimAsset | Type_265_ClearError | Type_265_ClearOrigin | Type_265_DepositAsset | Type_265_DepositReserveAsset | Type_265_DescendOrigin | Type_265_ExchangeAsset | Type_265_HrmpChannelAccepted | Type_265_HrmpChannelClosing | Type_265_HrmpNewChannelOpenRequest | Type_265_InitiateReserveWithdraw | Type_265_InitiateTeleport | Type_265_QueryHolding | Type_265_QueryResponse | Type_265_ReceiveTeleportedAsset | Type_265_RefundSurplus | Type_265_ReportError | Type_265_ReserveAssetDeposited | Type_265_SetAppendix | Type_265_SetErrorHandler | Type_265_SubscribeVersion | Type_265_Transact | Type_265_TransferAsset | Type_265_TransferReserveAsset | Type_265_Trap | Type_265_UnsubscribeVersion | Type_265_WithdrawAsset

export interface Type_265_BuyExecution {
    __kind: 'BuyExecution'
    fees: V2MultiAsset
    weightLimit: V2WeightLimit
}

export interface Type_265_ClaimAsset {
    __kind: 'ClaimAsset'
    assets: V2MultiAsset[]
    ticket: V2MultiLocation
}

export interface Type_265_ClearError {
    __kind: 'ClearError'
}

export interface Type_265_ClearOrigin {
    __kind: 'ClearOrigin'
}

export interface Type_265_DepositAsset {
    __kind: 'DepositAsset'
    assets: V2MultiAssetFilter
    maxAssets: number
    beneficiary: V2MultiLocation
}

export interface Type_265_DepositReserveAsset {
    __kind: 'DepositReserveAsset'
    assets: V2MultiAssetFilter
    maxAssets: number
    dest: V2MultiLocation
    xcm: V2Instruction[]
}

export interface Type_265_DescendOrigin {
    __kind: 'DescendOrigin'
    value: V2Junctions
}

export interface Type_265_ExchangeAsset {
    __kind: 'ExchangeAsset'
    give: V2MultiAssetFilter
    receive: V2MultiAsset[]
}

export interface Type_265_HrmpChannelAccepted {
    __kind: 'HrmpChannelAccepted'
    recipient: number
}

export interface Type_265_HrmpChannelClosing {
    __kind: 'HrmpChannelClosing'
    initiator: number
    sender: number
    recipient: number
}

export interface Type_265_HrmpNewChannelOpenRequest {
    __kind: 'HrmpNewChannelOpenRequest'
    sender: number
    maxMessageSize: number
    maxCapacity: number
}

export interface Type_265_InitiateReserveWithdraw {
    __kind: 'InitiateReserveWithdraw'
    assets: V2MultiAssetFilter
    reserve: V2MultiLocation
    xcm: V2Instruction[]
}

export interface Type_265_InitiateTeleport {
    __kind: 'InitiateTeleport'
    assets: V2MultiAssetFilter
    dest: V2MultiLocation
    xcm: V2Instruction[]
}

export interface Type_265_QueryHolding {
    __kind: 'QueryHolding'
    queryId: bigint
    dest: V2MultiLocation
    assets: V2MultiAssetFilter
    maxResponseWeight: bigint
}

export interface Type_265_QueryResponse {
    __kind: 'QueryResponse'
    queryId: bigint
    response: V2Response
    maxWeight: bigint
}

export interface Type_265_ReceiveTeleportedAsset {
    __kind: 'ReceiveTeleportedAsset'
    value: V2MultiAsset[]
}

export interface Type_265_RefundSurplus {
    __kind: 'RefundSurplus'
}

export interface Type_265_ReportError {
    __kind: 'ReportError'
    queryId: bigint
    dest: V2MultiLocation
    maxResponseWeight: bigint
}

export interface Type_265_ReserveAssetDeposited {
    __kind: 'ReserveAssetDeposited'
    value: V2MultiAsset[]
}

export interface Type_265_SetAppendix {
    __kind: 'SetAppendix'
    value: Type_265[]
}

export interface Type_265_SetErrorHandler {
    __kind: 'SetErrorHandler'
    value: Type_265[]
}

export interface Type_265_SubscribeVersion {
    __kind: 'SubscribeVersion'
    queryId: bigint
    maxResponseWeight: bigint
}

export interface Type_265_Transact {
    __kind: 'Transact'
    originType: V2OriginKind
    requireWeightAtMost: bigint
    call: Type_266
}

export interface Type_265_TransferAsset {
    __kind: 'TransferAsset'
    assets: V2MultiAsset[]
    beneficiary: V2MultiLocation
}

export interface Type_265_TransferReserveAsset {
    __kind: 'TransferReserveAsset'
    assets: V2MultiAsset[]
    dest: V2MultiLocation
    xcm: V2Instruction[]
}

export interface Type_265_Trap {
    __kind: 'Trap'
    value: bigint
}

export interface Type_265_UnsubscribeVersion {
    __kind: 'UnsubscribeVersion'
}

export interface Type_265_WithdrawAsset {
    __kind: 'WithdrawAsset'
    value: V2MultiAsset[]
}

export type Type_262 = Type_262_V2 | Type_262_V3

export interface Type_262_V2 {
    __kind: 'V2'
    value: Type_265[]
}

export interface Type_262_V3 {
    __kind: 'V3'
    value: Type_269[]
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type PolkadotXcmCall = PolkadotXcmCall_execute | PolkadotXcmCall_force_default_xcm_version | PolkadotXcmCall_force_subscribe_version_notify | PolkadotXcmCall_force_suspension | PolkadotXcmCall_force_unsubscribe_version_notify | PolkadotXcmCall_force_xcm_version | PolkadotXcmCall_limited_reserve_transfer_assets | PolkadotXcmCall_limited_teleport_assets | PolkadotXcmCall_reserve_transfer_assets | PolkadotXcmCall_send | PolkadotXcmCall_teleport_assets

/**
 * Execute an XCM message from a local, signed, origin.
 * 
 * An event is deposited indicating whether `msg` could be executed completely or only
 * partially.
 * 
 * No more than `max_weight` will be used in its attempted execution. If this is less than the
 * maximum amount of weight that the message could take to be executed, then no execution
 * attempt will be made.
 * 
 * NOTE: A successful return to this does *not* imply that the `msg` was executed successfully
 * to completion; only that *some* of it was executed.
 */
export interface PolkadotXcmCall_execute {
    __kind: 'execute'
    message: Type_262
    maxWeight: Weight
}

/**
 * Set a safe XCM version (the version that XCM should be encoded with if the most recent
 * version a destination can accept is unknown).
 * 
 * - `origin`: Must be an origin specified by AdminOrigin.
 * - `maybe_xcm_version`: The default XCM encoding version, or `None` to disable.
 */
export interface PolkadotXcmCall_force_default_xcm_version {
    __kind: 'force_default_xcm_version'
    maybeXcmVersion?: (number | undefined)
}

/**
 * Ask a location to notify us regarding their XCM version and any changes to it.
 * 
 * - `origin`: Must be an origin specified by AdminOrigin.
 * - `location`: The location to which we should subscribe for XCM version notifications.
 */
export interface PolkadotXcmCall_force_subscribe_version_notify {
    __kind: 'force_subscribe_version_notify'
    location: VersionedMultiLocation
}

/**
 * Set or unset the global suspension state of the XCM executor.
 * 
 * - `origin`: Must be an origin specified by AdminOrigin.
 * - `suspended`: `true` to suspend, `false` to resume.
 */
export interface PolkadotXcmCall_force_suspension {
    __kind: 'force_suspension'
    suspended: boolean
}

/**
 * Require that a particular destination should no longer notify us regarding any XCM
 * version changes.
 * 
 * - `origin`: Must be an origin specified by AdminOrigin.
 * - `location`: The location to which we are currently subscribed for XCM version
 *   notifications which we no longer desire.
 */
export interface PolkadotXcmCall_force_unsubscribe_version_notify {
    __kind: 'force_unsubscribe_version_notify'
    location: VersionedMultiLocation
}

/**
 * Extoll that a particular destination can be communicated with through a particular
 * version of XCM.
 * 
 * - `origin`: Must be an origin specified by AdminOrigin.
 * - `location`: The destination that is being described.
 * - `xcm_version`: The latest version of XCM that `location` supports.
 */
export interface PolkadotXcmCall_force_xcm_version {
    __kind: 'force_xcm_version'
    location: V3MultiLocation
    xcmVersion: number
}

/**
 * Transfer some assets from the local chain to the sovereign account of a destination
 * chain and forward a notification XCM.
 * 
 * Fee payment on the destination side is made from the asset in the `assets` vector of
 * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
 * is needed than `weight_limit`, then the operation will fail and the assets send may be
 * at risk.
 * 
 * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
 * - `dest`: Destination context for the assets. Will typically be `X2(Parent, Parachain(..))` to send
 *   from parachain to parachain, or `X1(Parachain(..))` to send from relay to parachain.
 * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will generally be
 *   an `AccountId32` value.
 * - `assets`: The assets to be withdrawn. This should include the assets used to pay the fee on the
 *   `dest` side.
 * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
 *   fees.
 * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
 */
export interface PolkadotXcmCall_limited_reserve_transfer_assets {
    __kind: 'limited_reserve_transfer_assets'
    dest: VersionedMultiLocation
    beneficiary: VersionedMultiLocation
    assets: VersionedMultiAssets
    feeAssetItem: number
    weightLimit: V3WeightLimit
}

/**
 * Teleport some assets from the local chain to some destination chain.
 * 
 * Fee payment on the destination side is made from the asset in the `assets` vector of
 * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
 * is needed than `weight_limit`, then the operation will fail and the assets send may be
 * at risk.
 * 
 * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
 * - `dest`: Destination context for the assets. Will typically be `X2(Parent, Parachain(..))` to send
 *   from parachain to parachain, or `X1(Parachain(..))` to send from relay to parachain.
 * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will generally be
 *   an `AccountId32` value.
 * - `assets`: The assets to be withdrawn. The first item should be the currency used to to pay the fee on the
 *   `dest` side. May not be empty.
 * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
 *   fees.
 * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
 */
export interface PolkadotXcmCall_limited_teleport_assets {
    __kind: 'limited_teleport_assets'
    dest: VersionedMultiLocation
    beneficiary: VersionedMultiLocation
    assets: VersionedMultiAssets
    feeAssetItem: number
    weightLimit: V3WeightLimit
}

/**
 * Transfer some assets from the local chain to the sovereign account of a destination
 * chain and forward a notification XCM.
 * 
 * Fee payment on the destination side is made from the asset in the `assets` vector of
 * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
 * with all fees taken as needed from the asset.
 * 
 * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
 * - `dest`: Destination context for the assets. Will typically be `X2(Parent, Parachain(..))` to send
 *   from parachain to parachain, or `X1(Parachain(..))` to send from relay to parachain.
 * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will generally be
 *   an `AccountId32` value.
 * - `assets`: The assets to be withdrawn. This should include the assets used to pay the fee on the
 *   `dest` side.
 * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
 *   fees.
 */
export interface PolkadotXcmCall_reserve_transfer_assets {
    __kind: 'reserve_transfer_assets'
    dest: VersionedMultiLocation
    beneficiary: VersionedMultiLocation
    assets: VersionedMultiAssets
    feeAssetItem: number
}

export interface PolkadotXcmCall_send {
    __kind: 'send'
    dest: VersionedMultiLocation
    message: VersionedXcm
}

/**
 * Teleport some assets from the local chain to some destination chain.
 * 
 * Fee payment on the destination side is made from the asset in the `assets` vector of
 * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
 * with all fees taken as needed from the asset.
 * 
 * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
 * - `dest`: Destination context for the assets. Will typically be `X2(Parent, Parachain(..))` to send
 *   from parachain to parachain, or `X1(Parachain(..))` to send from relay to parachain.
 * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will generally be
 *   an `AccountId32` value.
 * - `assets`: The assets to be withdrawn. The first item should be the currency used to to pay the fee on the
 *   `dest` side. May not be empty.
 * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
 *   fees.
 */
export interface PolkadotXcmCall_teleport_assets {
    __kind: 'teleport_assets'
    dest: VersionedMultiLocation
    beneficiary: VersionedMultiLocation
    assets: VersionedMultiAssets
    feeAssetItem: number
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
export const NftCall: sts.Type<NftCall> = sts.closedEnum(() => {
    return  {
        approve_item_attributes: sts.enumStruct({
            collection: sts.number(),
            item: H256,
            delegate: MultiAddress,
        }),
        approve_transfer: sts.enumStruct({
            collection: sts.number(),
            item: H256,
            delegate: MultiAddress,
            maybeDeadline: sts.option(() => sts.number()),
        }),
        burn: sts.enumStruct({
            collection: sts.number(),
            item: H256,
        }),
        buy_item: sts.enumStruct({
            collection: sts.number(),
            item: H256,
            bidPrice: sts.bigint(),
        }),
        cancel_approval: sts.enumStruct({
            collection: sts.number(),
            item: H256,
            delegate: MultiAddress,
        }),
        cancel_item_attributes_approval: sts.enumStruct({
            collection: sts.number(),
            item: H256,
            delegate: MultiAddress,
            witness: CancelAttributesApprovalWitness,
        }),
        cancel_swap: sts.enumStruct({
            offeredCollection: sts.number(),
            offeredItem: H256,
        }),
        claim_swap: sts.enumStruct({
            sendCollection: sts.number(),
            sendItem: H256,
            receiveCollection: sts.number(),
            receiveItem: H256,
            witnessPrice: sts.option(() => PriceWithDirection),
        }),
        clear_all_transfer_approvals: sts.enumStruct({
            collection: sts.number(),
            item: H256,
        }),
        clear_attribute: sts.enumStruct({
            collection: sts.number(),
            maybeItem: sts.option(() => H256),
            namespace: AttributeNamespace,
            key: sts.bytes(),
        }),
        clear_collection_metadata: sts.enumStruct({
            collection: sts.number(),
        }),
        clear_metadata: sts.enumStruct({
            collection: sts.number(),
            item: H256,
        }),
        create: sts.enumStruct({
            admin: MultiAddress,
            config: CollectionConfig,
        }),
        create_swap: sts.enumStruct({
            offeredCollection: sts.number(),
            offeredItem: H256,
            desiredCollection: sts.number(),
            maybeDesiredItem: sts.option(() => H256),
            maybePrice: sts.option(() => PriceWithDirection),
            duration: sts.number(),
        }),
        destroy: sts.enumStruct({
            collection: sts.number(),
            witness: DestroyWitness,
        }),
        force_collection_config: sts.enumStruct({
            collection: sts.number(),
            config: CollectionConfig,
        }),
        force_collection_owner: sts.enumStruct({
            collection: sts.number(),
            owner: MultiAddress,
        }),
        force_create: sts.enumStruct({
            owner: MultiAddress,
            config: CollectionConfig,
        }),
        force_mint: sts.enumStruct({
            collection: sts.number(),
            item: H256,
            mintTo: MultiAddress,
            itemConfig: ItemConfig,
        }),
        force_set_attribute: sts.enumStruct({
            setAs: sts.option(() => AccountId32),
            collection: sts.number(),
            maybeItem: sts.option(() => H256),
            namespace: AttributeNamespace,
            key: sts.bytes(),
            value: sts.bytes(),
        }),
        lock_collection: sts.enumStruct({
            collection: sts.number(),
            lockSettings: BitFlags,
        }),
        lock_item_properties: sts.enumStruct({
            collection: sts.number(),
            item: H256,
            lockMetadata: sts.boolean(),
            lockAttributes: sts.boolean(),
        }),
        lock_item_transfer: sts.enumStruct({
            collection: sts.number(),
            item: H256,
        }),
        mint: sts.enumStruct({
            collection: sts.number(),
            item: H256,
            mintTo: MultiAddress,
            witnessData: sts.option(() => MintWitness),
        }),
        mint_pre_signed: sts.enumStruct({
            mintData: PreSignedMint,
            signature: MultiSignature,
            signer: AccountId32,
        }),
        pay_tips: sts.enumStruct({
            tips: sts.array(() => ItemTip),
        }),
        redeposit: sts.enumStruct({
            collection: sts.number(),
            items: sts.array(() => H256),
        }),
        set_accept_ownership: sts.enumStruct({
            maybeCollection: sts.option(() => sts.number()),
        }),
        set_attribute: sts.enumStruct({
            collection: sts.number(),
            maybeItem: sts.option(() => H256),
            namespace: AttributeNamespace,
            key: sts.bytes(),
            value: sts.bytes(),
        }),
        set_attributes_pre_signed: sts.enumStruct({
            data: PreSignedAttributes,
            signature: MultiSignature,
            signer: AccountId32,
        }),
        set_collection_max_supply: sts.enumStruct({
            collection: sts.number(),
            maxSupply: sts.number(),
        }),
        set_collection_metadata: sts.enumStruct({
            collection: sts.number(),
            data: sts.bytes(),
        }),
        set_metadata: sts.enumStruct({
            collection: sts.number(),
            item: H256,
            data: sts.bytes(),
        }),
        set_price: sts.enumStruct({
            collection: sts.number(),
            item: H256,
            price: sts.option(() => sts.bigint()),
            whitelistedBuyer: sts.option(() => MultiAddress),
        }),
        set_team: sts.enumStruct({
            collection: sts.number(),
            issuer: sts.option(() => MultiAddress),
            admin: sts.option(() => MultiAddress),
            freezer: sts.option(() => MultiAddress),
        }),
        transfer: sts.enumStruct({
            collection: sts.number(),
            item: H256,
            dest: MultiAddress,
        }),
        transfer_ownership: sts.enumStruct({
            collection: sts.number(),
            owner: MultiAddress,
        }),
        unlock_item_transfer: sts.enumStruct({
            collection: sts.number(),
            item: H256,
        }),
        update_mint_settings: sts.enumStruct({
            collection: sts.number(),
            mintSettings: MintSettings,
        }),
    }
})

export const MintSettings: sts.Type<MintSettings> = sts.struct(() => {
    return  {
        mintType: MintType,
        price: sts.option(() => sts.bigint()),
        startBlock: sts.option(() => sts.number()),
        endBlock: sts.option(() => sts.number()),
        defaultItemSettings: sts.bigint(),
    }
})

export const MintType: sts.Type<MintType> = sts.closedEnum(() => {
    return  {
        HolderOf: sts.number(),
        Issuer: sts.unit(),
        Public: sts.unit(),
    }
})

export type MintType = MintType_HolderOf | MintType_Issuer | MintType_Public

export interface MintType_HolderOf {
    __kind: 'HolderOf'
    value: number
}

export interface MintType_Issuer {
    __kind: 'Issuer'
}

export interface MintType_Public {
    __kind: 'Public'
}

export interface MintSettings {
    mintType: MintType
    price?: (bigint | undefined)
    startBlock?: (number | undefined)
    endBlock?: (number | undefined)
    defaultItemSettings: bigint
}

export const PreSignedAttributes: sts.Type<PreSignedAttributes> = sts.struct(() => {
    return  {
        collection: sts.number(),
        item: H256,
        attributes: sts.array(() => sts.tuple(() => [sts.bytes(), sts.bytes()])),
        namespace: AttributeNamespace,
        deadline: sts.number(),
    }
})

export interface PreSignedAttributes {
    collection: number
    item: H256
    attributes: [Bytes, Bytes][]
    namespace: AttributeNamespace
    deadline: number
}

export type AttributeNamespace = AttributeNamespace_Account | AttributeNamespace_CollectionOwner | AttributeNamespace_ItemOwner | AttributeNamespace_Pallet

export interface AttributeNamespace_Account {
    __kind: 'Account'
    value: AccountId32
}

export interface AttributeNamespace_CollectionOwner {
    __kind: 'CollectionOwner'
}

export interface AttributeNamespace_ItemOwner {
    __kind: 'ItemOwner'
}

export interface AttributeNamespace_Pallet {
    __kind: 'Pallet'
}

export const ItemTip: sts.Type<ItemTip> = sts.struct(() => {
    return  {
        collection: sts.number(),
        item: H256,
        receiver: AccountId32,
        amount: sts.bigint(),
    }
})

export interface ItemTip {
    collection: number
    item: H256
    receiver: AccountId32
    amount: bigint
}

export const MultiSignature: sts.Type<MultiSignature> = sts.closedEnum(() => {
    return  {
        Ecdsa: sts.bytes(),
        Ed25519: Signature,
        Sr25519: sts.bytes(),
    }
})

export const Signature = sts.bytes()

export type MultiSignature = MultiSignature_Ecdsa | MultiSignature_Ed25519 | MultiSignature_Sr25519

export interface MultiSignature_Ecdsa {
    __kind: 'Ecdsa'
    value: Bytes
}

export interface MultiSignature_Ed25519 {
    __kind: 'Ed25519'
    value: Signature
}

export interface MultiSignature_Sr25519 {
    __kind: 'Sr25519'
    value: Bytes
}

export type Signature = Bytes

export const PreSignedMint: sts.Type<PreSignedMint> = sts.struct(() => {
    return  {
        collection: sts.number(),
        item: H256,
        attributes: sts.array(() => sts.tuple(() => [sts.bytes(), sts.bytes()])),
        metadata: sts.bytes(),
        onlyAccount: sts.option(() => AccountId32),
        deadline: sts.number(),
    }
})

export interface PreSignedMint {
    collection: number
    item: H256
    attributes: [Bytes, Bytes][]
    metadata: Bytes
    onlyAccount?: (AccountId32 | undefined)
    deadline: number
}

export const MintWitness: sts.Type<MintWitness> = sts.struct(() => {
    return  {
        ownedItem: H256,
    }
})

export interface MintWitness {
    ownedItem: H256
}

export const BitFlags = sts.bigint()

export const ItemConfig: sts.Type<ItemConfig> = sts.struct(() => {
    return  {
        settings: sts.bigint(),
    }
})

export interface ItemConfig {
    settings: bigint
}

export const DestroyWitness: sts.Type<DestroyWitness> = sts.struct(() => {
    return  {
        itemMetadatas: sts.number(),
        itemConfigs: sts.number(),
        attributes: sts.number(),
    }
})

export interface DestroyWitness {
    itemMetadatas: number
    itemConfigs: number
    attributes: number
}

export const CollectionConfig: sts.Type<CollectionConfig> = sts.struct(() => {
    return  {
        settings: BitFlags,
        maxSupply: sts.option(() => sts.number()),
        mintSettings: MintSettings,
    }
})

export interface CollectionConfig {
    settings: BitFlags
    maxSupply?: (number | undefined)
    mintSettings: MintSettings
}

export type BitFlags = bigint

export const AttributeNamespace: sts.Type<AttributeNamespace> = sts.closedEnum(() => {
    return  {
        Account: AccountId32,
        CollectionOwner: sts.unit(),
        ItemOwner: sts.unit(),
        Pallet: sts.unit(),
    }
})

export const PriceWithDirection: sts.Type<PriceWithDirection> = sts.struct(() => {
    return  {
        amount: sts.bigint(),
        direction: PriceDirection,
    }
})

export const PriceDirection: sts.Type<PriceDirection> = sts.closedEnum(() => {
    return  {
        Receive: sts.unit(),
        Send: sts.unit(),
    }
})

export type PriceDirection = PriceDirection_Receive | PriceDirection_Send

export interface PriceDirection_Receive {
    __kind: 'Receive'
}

export interface PriceDirection_Send {
    __kind: 'Send'
}

export interface PriceWithDirection {
    amount: bigint
    direction: PriceDirection
}

export const CancelAttributesApprovalWitness: sts.Type<CancelAttributesApprovalWitness> = sts.struct(() => {
    return  {
        accountAttributes: sts.number(),
    }
})

export interface CancelAttributesApprovalWitness {
    accountAttributes: number
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type NftCall = NftCall_approve_item_attributes | NftCall_approve_transfer | NftCall_burn | NftCall_buy_item | NftCall_cancel_approval | NftCall_cancel_item_attributes_approval | NftCall_cancel_swap | NftCall_claim_swap | NftCall_clear_all_transfer_approvals | NftCall_clear_attribute | NftCall_clear_collection_metadata | NftCall_clear_metadata | NftCall_create | NftCall_create_swap | NftCall_destroy | NftCall_force_collection_config | NftCall_force_collection_owner | NftCall_force_create | NftCall_force_mint | NftCall_force_set_attribute | NftCall_lock_collection | NftCall_lock_item_properties | NftCall_lock_item_transfer | NftCall_mint | NftCall_mint_pre_signed | NftCall_pay_tips | NftCall_redeposit | NftCall_set_accept_ownership | NftCall_set_attribute | NftCall_set_attributes_pre_signed | NftCall_set_collection_max_supply | NftCall_set_collection_metadata | NftCall_set_metadata | NftCall_set_price | NftCall_set_team | NftCall_transfer | NftCall_transfer_ownership | NftCall_unlock_item_transfer | NftCall_update_mint_settings

/**
 * Approve item's attributes to be changed by a delegated third-party account.
 * 
 * Origin must be Signed and must be an owner of the `item`.
 * 
 * - `collection`: A collection of the item.
 * - `item`: The item that holds attributes.
 * - `delegate`: The account to delegate permission to change attributes of the item.
 * 
 * Emits `ItemAttributesApprovalAdded` on success.
 */
export interface NftCall_approve_item_attributes {
    __kind: 'approve_item_attributes'
    collection: number
    item: H256
    delegate: MultiAddress
}

/**
 * Approve an item to be transferred by a delegated third-party account.
 * 
 * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
 * `item`.
 * 
 * - `collection`: The collection of the item to be approved for delegated transfer.
 * - `item`: The item to be approved for delegated transfer.
 * - `delegate`: The account to delegate permission to transfer the item.
 * - `maybe_deadline`: Optional deadline for the approval. Specified by providing the
 * 	number of blocks after which the approval will expire
 * 
 * Emits `TransferApproved` on success.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_approve_transfer {
    __kind: 'approve_transfer'
    collection: number
    item: H256
    delegate: MultiAddress
    maybeDeadline?: (number | undefined)
}

/**
 * Destroy a single item.
 * 
 * The origin must conform to `ForceOrigin` or must be Signed and the signing account must
 * be the owner of the `item`.
 * 
 * - `collection`: The collection of the item to be burned.
 * - `item`: The item to be burned.
 * 
 * Emits `Burned`.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_burn {
    __kind: 'burn'
    collection: number
    item: H256
}

/**
 * Allows to buy an item if it's up for sale.
 * 
 * Origin must be Signed and must not be the owner of the `item`.
 * 
 * - `collection`: The collection of the item.
 * - `item`: The item the sender wants to buy.
 * - `bid_price`: The price the sender is willing to pay.
 * 
 * Emits `ItemBought` on success.
 */
export interface NftCall_buy_item {
    __kind: 'buy_item'
    collection: number
    item: H256
    bidPrice: bigint
}

/**
 * Cancel one of the transfer approvals for a specific item.
 * 
 * Origin must be either:
 * - the `Force` origin;
 * - `Signed` with the signer being the Owner of the `item`;
 * 
 * Arguments:
 * - `collection`: The collection of the item of whose approval will be cancelled.
 * - `item`: The item of the collection of whose approval will be cancelled.
 * - `delegate`: The account that is going to loose their approval.
 * 
 * Emits `ApprovalCancelled` on success.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_cancel_approval {
    __kind: 'cancel_approval'
    collection: number
    item: H256
    delegate: MultiAddress
}

/**
 * Cancel the previously provided approval to change item's attributes.
 * All the previously set attributes by the `delegate` will be removed.
 * 
 * Origin must be Signed and must be an owner of the `item`.
 * 
 * - `collection`: Collection that the item is contained within.
 * - `item`: The item that holds attributes.
 * - `delegate`: The previously approved account to remove.
 * 
 * Emits `ItemAttributesApprovalRemoved` on success.
 */
export interface NftCall_cancel_item_attributes_approval {
    __kind: 'cancel_item_attributes_approval'
    collection: number
    item: H256
    delegate: MultiAddress
    witness: CancelAttributesApprovalWitness
}

/**
 * Cancel an atomic swap.
 * 
 * Origin must be Signed.
 * Origin must be an owner of the `item` if the deadline hasn't expired.
 * 
 * - `collection`: The collection of the item.
 * - `item`: The item an owner wants to give.
 * 
 * Emits `SwapCancelled` on success.
 */
export interface NftCall_cancel_swap {
    __kind: 'cancel_swap'
    offeredCollection: number
    offeredItem: H256
}

/**
 * Claim an atomic swap.
 * This method executes a pending swap, that was created by a counterpart before.
 * 
 * Origin must be Signed and must be an owner of the `item`.
 * 
 * - `send_collection`: The collection of the item to be sent.
 * - `send_item`: The item to be sent.
 * - `receive_collection`: The collection of the item to be received.
 * - `receive_item`: The item to be received.
 * - `witness_price`: A price that was previously agreed on.
 * 
 * Emits `SwapClaimed` on success.
 */
export interface NftCall_claim_swap {
    __kind: 'claim_swap'
    sendCollection: number
    sendItem: H256
    receiveCollection: number
    receiveItem: H256
    witnessPrice?: (PriceWithDirection | undefined)
}

/**
 * Cancel all the approvals of a specific item.
 * 
 * Origin must be either:
 * - the `Force` origin;
 * - `Signed` with the signer being the Owner of the `item`;
 * 
 * Arguments:
 * - `collection`: The collection of the item of whose approvals will be cleared.
 * - `item`: The item of the collection of whose approvals will be cleared.
 * 
 * Emits `AllApprovalsCancelled` on success.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_clear_all_transfer_approvals {
    __kind: 'clear_all_transfer_approvals'
    collection: number
    item: H256
}

/**
 * Clear an attribute for a collection or item.
 * 
 * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
 * attribute.
 * 
 * Any deposit is freed for the collection's owner.
 * 
 * - `collection`: The identifier of the collection whose item's metadata to clear.
 * - `maybe_item`: The identifier of the item whose metadata to clear.
 * - `namespace`: Attribute's namespace.
 * - `key`: The key of the attribute.
 * 
 * Emits `AttributeCleared`.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_clear_attribute {
    __kind: 'clear_attribute'
    collection: number
    maybeItem?: (H256 | undefined)
    namespace: AttributeNamespace
    key: Bytes
}

/**
 * Clear the metadata for a collection.
 * 
 * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Admin of
 * the `collection`.
 * 
 * Any deposit is freed for the collection's owner.
 * 
 * - `collection`: The identifier of the collection whose metadata to clear.
 * 
 * Emits `CollectionMetadataCleared`.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_clear_collection_metadata {
    __kind: 'clear_collection_metadata'
    collection: number
}

/**
 * Clear the metadata for an item.
 * 
 * Origin must be either `ForceOrigin` or Signed and the sender should be the Admin of the
 * `collection`.
 * 
 * Any deposit is freed for the collection's owner.
 * 
 * - `collection`: The identifier of the collection whose item's metadata to clear.
 * - `item`: The identifier of the item whose metadata to clear.
 * 
 * Emits `ItemMetadataCleared`.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_clear_metadata {
    __kind: 'clear_metadata'
    collection: number
    item: H256
}

/**
 * Issue a new collection of non-fungible items from a public origin.
 * 
 * This new collection has no items initially and its owner is the origin.
 * 
 * The origin must be Signed and the sender must have sufficient funds free.
 * 
 * `ItemDeposit` funds of sender are reserved.
 * 
 * Parameters:
 * - `admin`: The admin of this collection. The admin is the initial address of each
 * member of the collection's admin team.
 * 
 * Emits `Created` event when successful.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_create {
    __kind: 'create'
    admin: MultiAddress
    config: CollectionConfig
}

/**
 * Register a new atomic swap, declaring an intention to send an `item` in exchange for
 * `desired_item` from origin to target on the current blockchain.
 * The target can execute the swap during the specified `duration` of blocks (if set).
 * Additionally, the price could be set for the desired `item`.
 * 
 * Origin must be Signed and must be an owner of the `item`.
 * 
 * - `collection`: The collection of the item.
 * - `item`: The item an owner wants to give.
 * - `desired_collection`: The collection of the desired item.
 * - `desired_item`: The desired item an owner wants to receive.
 * - `maybe_price`: The price an owner is willing to pay or receive for the desired `item`.
 * - `duration`: A deadline for the swap. Specified by providing the number of blocks
 * 	after which the swap will expire.
 * 
 * Emits `SwapCreated` on success.
 */
export interface NftCall_create_swap {
    __kind: 'create_swap'
    offeredCollection: number
    offeredItem: H256
    desiredCollection: number
    maybeDesiredItem?: (H256 | undefined)
    maybePrice?: (PriceWithDirection | undefined)
    duration: number
}

/**
 * Destroy a collection of fungible items.
 * 
 * The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the
 * owner of the `collection`.
 * 
 * NOTE: The collection must have 0 items to be destroyed.
 * 
 * - `collection`: The identifier of the collection to be destroyed.
 * - `witness`: Information on the items minted in the collection. This must be
 * correct.
 * 
 * Emits `Destroyed` event when successful.
 * 
 * Weight: `O(m + c + a)` where:
 * - `m = witness.item_metadatas`
 * - `c = witness.item_configs`
 * - `a = witness.attributes`
 */
export interface NftCall_destroy {
    __kind: 'destroy'
    collection: number
    witness: DestroyWitness
}

/**
 * Change the config of a collection.
 * 
 * Origin must be `ForceOrigin`.
 * 
 * - `collection`: The identifier of the collection.
 * - `config`: The new config of this collection.
 * 
 * Emits `CollectionConfigChanged`.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_force_collection_config {
    __kind: 'force_collection_config'
    collection: number
    config: CollectionConfig
}

/**
 * Change the Owner of a collection.
 * 
 * Origin must be `ForceOrigin`.
 * 
 * - `collection`: The identifier of the collection.
 * - `owner`: The new Owner of this collection.
 * 
 * Emits `OwnerChanged`.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_force_collection_owner {
    __kind: 'force_collection_owner'
    collection: number
    owner: MultiAddress
}

/**
 * Issue a new collection of non-fungible items from a privileged origin.
 * 
 * This new collection has no items initially.
 * 
 * The origin must conform to `ForceOrigin`.
 * 
 * Unlike `create`, no funds are reserved.
 * 
 * - `owner`: The owner of this collection of items. The owner has full superuser
 *   permissions over this item, but may later change and configure the permissions using
 *   `transfer_ownership` and `set_team`.
 * 
 * Emits `ForceCreated` event when successful.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_force_create {
    __kind: 'force_create'
    owner: MultiAddress
    config: CollectionConfig
}

/**
 * Mint an item of a particular collection from a privileged origin.
 * 
 * The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the
 * Issuer of the `collection`.
 * 
 * - `collection`: The collection of the item to be minted.
 * - `item`: An identifier of the new item.
 * - `mint_to`: Account into which the item will be minted.
 * - `item_config`: A config of the new item.
 * 
 * Emits `Issued` event when successful.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_force_mint {
    __kind: 'force_mint'
    collection: number
    item: H256
    mintTo: MultiAddress
    itemConfig: ItemConfig
}

/**
 * Force-set an attribute for a collection or item.
 * 
 * Origin must be `ForceOrigin`.
 * 
 * If the attribute already exists and it was set by another account, the deposit
 * will be returned to the previous owner.
 * 
 * - `set_as`: An optional owner of the attribute.
 * - `collection`: The identifier of the collection whose item's metadata to set.
 * - `maybe_item`: The identifier of the item whose metadata to set.
 * - `namespace`: Attribute's namespace.
 * - `key`: The key of the attribute.
 * - `value`: The value to which to set the attribute.
 * 
 * Emits `AttributeSet`.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_force_set_attribute {
    __kind: 'force_set_attribute'
    setAs?: (AccountId32 | undefined)
    collection: number
    maybeItem?: (H256 | undefined)
    namespace: AttributeNamespace
    key: Bytes
    value: Bytes
}

/**
 * Disallows specified settings for the whole collection.
 * 
 * Origin must be Signed and the sender should be the Owner of the `collection`.
 * 
 * - `collection`: The collection to be locked.
 * - `lock_settings`: The settings to be locked.
 * 
 * Note: it's possible to only lock(set) the setting, but not to unset it.
 * 
 * Emits `CollectionLocked`.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_lock_collection {
    __kind: 'lock_collection'
    collection: number
    lockSettings: BitFlags
}

/**
 * Disallows changing the metadata or attributes of the item.
 * 
 * Origin must be either `ForceOrigin` or Signed and the sender should be the Admin
 * of the `collection`.
 * 
 * - `collection`: The collection if the `item`.
 * - `item`: An item to be locked.
 * - `lock_metadata`: Specifies whether the metadata should be locked.
 * - `lock_attributes`: Specifies whether the attributes in the `CollectionOwner` namespace
 *   should be locked.
 * 
 * Note: `lock_attributes` affects the attributes in the `CollectionOwner` namespace only.
 * When the metadata or attributes are locked, it won't be possible the unlock them.
 * 
 * Emits `ItemPropertiesLocked`.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_lock_item_properties {
    __kind: 'lock_item_properties'
    collection: number
    item: H256
    lockMetadata: boolean
    lockAttributes: boolean
}

/**
 * Disallow further unprivileged transfer of an item.
 * 
 * Origin must be Signed and the sender should be the Freezer of the `collection`.
 * 
 * - `collection`: The collection of the item to be changed.
 * - `item`: The item to become non-transferable.
 * 
 * Emits `ItemTransferLocked`.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_lock_item_transfer {
    __kind: 'lock_item_transfer'
    collection: number
    item: H256
}

/**
 * Mint an item of a particular collection.
 * 
 * The origin must be Signed and the sender must comply with the `mint_settings` rules.
 * 
 * - `collection`: The collection of the item to be minted.
 * - `item`: An identifier of the new item.
 * - `mint_to`: Account into which the item will be minted.
 * - `witness_data`: When the mint type is `HolderOf(collection_id)`, then the owned
 *   item_id from that collection needs to be provided within the witness data object.
 * 
 * Note: the deposit will be taken from the `origin` and not the `owner` of the `item`.
 * 
 * Emits `Issued` event when successful.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_mint {
    __kind: 'mint'
    collection: number
    item: H256
    mintTo: MultiAddress
    witnessData?: (MintWitness | undefined)
}

/**
 * Mint an item by providing the pre-signed approval.
 * 
 * Origin must be Signed.
 * 
 * - `mint_data`: The pre-signed approval that consists of the information about the item,
 *   its metadata, attributes, who can mint it (`None` for anyone) and until what block
 *   number.
 * - `signature`: The signature of the `data` object.
 * - `signer`: The `data` object's signer. Should be an Issuer of the collection.
 * 
 * Emits `Issued` on success.
 * Emits `AttributeSet` if the attributes were provided.
 * Emits `ItemMetadataSet` if the metadata was not empty.
 */
export interface NftCall_mint_pre_signed {
    __kind: 'mint_pre_signed'
    mintData: PreSignedMint
    signature: MultiSignature
    signer: AccountId32
}

/**
 * Allows to pay the tips.
 * 
 * Origin must be Signed.
 * 
 * - `tips`: Tips array.
 * 
 * Emits `TipSent` on every tip transfer.
 */
export interface NftCall_pay_tips {
    __kind: 'pay_tips'
    tips: ItemTip[]
}

/**
 * Re-evaluate the deposits on some items.
 * 
 * Origin must be Signed and the sender should be the Owner of the `collection`.
 * 
 * - `collection`: The collection of the items to be reevaluated.
 * - `items`: The items of the collection whose deposits will be reevaluated.
 * 
 * NOTE: This exists as a best-effort function. Any items which are unknown or
 * in the case that the owner account does not have reservable funds to pay for a
 * deposit increase are ignored. Generally the owner isn't going to call this on items
 * whose existing deposit is less than the refreshed deposit as it would only cost them,
 * so it's of little consequence.
 * 
 * It will still return an error in the case that the collection is unknown or the signer
 * is not permitted to call it.
 * 
 * Weight: `O(items.len())`
 */
export interface NftCall_redeposit {
    __kind: 'redeposit'
    collection: number
    items: H256[]
}

/**
 * Set (or reset) the acceptance of ownership for a particular account.
 * 
 * Origin must be `Signed` and if `maybe_collection` is `Some`, then the signer must have a
 * provider reference.
 * 
 * - `maybe_collection`: The identifier of the collection whose ownership the signer is
 *   willing to accept, or if `None`, an indication that the signer is willing to accept no
 *   ownership transferal.
 * 
 * Emits `OwnershipAcceptanceChanged`.
 */
export interface NftCall_set_accept_ownership {
    __kind: 'set_accept_ownership'
    maybeCollection?: (number | undefined)
}

/**
 * Set an attribute for a collection or item.
 * 
 * Origin must be Signed and must conform to the namespace ruleset:
 * - `CollectionOwner` namespace could be modified by the `collection` Admin only;
 * - `ItemOwner` namespace could be modified by the `maybe_item` owner only. `maybe_item`
 *   should be set in that case;
 * - `Account(AccountId)` namespace could be modified only when the `origin` was given a
 *   permission to do so;
 * 
 * The funds of `origin` are reserved according to the formula:
 * `AttributeDepositBase + DepositPerByte * (key.len + value.len)` taking into
 * account any already reserved funds.
 * 
 * - `collection`: The identifier of the collection whose item's metadata to set.
 * - `maybe_item`: The identifier of the item whose metadata to set.
 * - `namespace`: Attribute's namespace.
 * - `key`: The key of the attribute.
 * - `value`: The value to which to set the attribute.
 * 
 * Emits `AttributeSet`.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_set_attribute {
    __kind: 'set_attribute'
    collection: number
    maybeItem?: (H256 | undefined)
    namespace: AttributeNamespace
    key: Bytes
    value: Bytes
}

/**
 * Set attributes for an item by providing the pre-signed approval.
 * 
 * Origin must be Signed and must be an owner of the `data.item`.
 * 
 * - `data`: The pre-signed approval that consists of the information about the item,
 *   attributes to update and until what block number.
 * - `signature`: The signature of the `data` object.
 * - `signer`: The `data` object's signer. Should be an Admin of the collection for the
 *   `CollectionOwner` namespace.
 * 
 * Emits `AttributeSet` for each provided attribute.
 * Emits `ItemAttributesApprovalAdded` if the approval wasn't set before.
 * Emits `PreSignedAttributesSet` on success.
 */
export interface NftCall_set_attributes_pre_signed {
    __kind: 'set_attributes_pre_signed'
    data: PreSignedAttributes
    signature: MultiSignature
    signer: AccountId32
}

/**
 * Set the maximum number of items a collection could have.
 * 
 * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of
 * the `collection`.
 * 
 * - `collection`: The identifier of the collection to change.
 * - `max_supply`: The maximum number of items a collection could have.
 * 
 * Emits `CollectionMaxSupplySet` event when successful.
 */
export interface NftCall_set_collection_max_supply {
    __kind: 'set_collection_max_supply'
    collection: number
    maxSupply: number
}

/**
 * Set the metadata for a collection.
 * 
 * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Admin of
 * the `collection`.
 * 
 * If the origin is `Signed`, then funds of signer are reserved according to the formula:
 * `MetadataDepositBase + DepositPerByte * data.len` taking into
 * account any already reserved funds.
 * 
 * - `collection`: The identifier of the item whose metadata to update.
 * - `data`: The general information of this item. Limited in length by `StringLimit`.
 * 
 * Emits `CollectionMetadataSet`.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_set_collection_metadata {
    __kind: 'set_collection_metadata'
    collection: number
    data: Bytes
}

/**
 * Set the metadata for an item.
 * 
 * Origin must be either `ForceOrigin` or Signed and the sender should be the Admin of the
 * `collection`.
 * 
 * If the origin is Signed, then funds of signer are reserved according to the formula:
 * `MetadataDepositBase + DepositPerByte * data.len` taking into
 * account any already reserved funds.
 * 
 * - `collection`: The identifier of the collection whose item's metadata to set.
 * - `item`: The identifier of the item whose metadata to set.
 * - `data`: The general information of this item. Limited in length by `StringLimit`.
 * 
 * Emits `ItemMetadataSet`.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_set_metadata {
    __kind: 'set_metadata'
    collection: number
    item: H256
    data: Bytes
}

/**
 * Set (or reset) the price for an item.
 * 
 * Origin must be Signed and must be the owner of the `item`.
 * 
 * - `collection`: The collection of the item.
 * - `item`: The item to set the price for.
 * - `price`: The price for the item. Pass `None`, to reset the price.
 * - `buyer`: Restricts the buy operation to a specific account.
 * 
 * Emits `ItemPriceSet` on success if the price is not `None`.
 * Emits `ItemPriceRemoved` on success if the price is `None`.
 */
export interface NftCall_set_price {
    __kind: 'set_price'
    collection: number
    item: H256
    price?: (bigint | undefined)
    whitelistedBuyer?: (MultiAddress | undefined)
}

/**
 * Change the Issuer, Admin and Freezer of a collection.
 * 
 * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
 * `collection`.
 * 
 * Note: by setting the role to `None` only the `ForceOrigin` will be able to change it
 * after to `Some(account)`.
 * 
 * - `collection`: The collection whose team should be changed.
 * - `issuer`: The new Issuer of this collection.
 * - `admin`: The new Admin of this collection.
 * - `freezer`: The new Freezer of this collection.
 * 
 * Emits `TeamChanged`.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_set_team {
    __kind: 'set_team'
    collection: number
    issuer?: (MultiAddress | undefined)
    admin?: (MultiAddress | undefined)
    freezer?: (MultiAddress | undefined)
}

/**
 * Move an item from the sender account to another.
 * 
 * Origin must be Signed and the signing account must be either:
 * - the Owner of the `item`;
 * - the approved delegate for the `item` (in this case, the approval is reset).
 * 
 * Arguments:
 * - `collection`: The collection of the item to be transferred.
 * - `item`: The item to be transferred.
 * - `dest`: The account to receive ownership of the item.
 * 
 * Emits `Transferred`.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_transfer {
    __kind: 'transfer'
    collection: number
    item: H256
    dest: MultiAddress
}

/**
 * Change the Owner of a collection.
 * 
 * Origin must be Signed and the sender should be the Owner of the `collection`.
 * 
 * - `collection`: The collection whose owner should be changed.
 * - `owner`: The new Owner of this collection. They must have called
 *   `set_accept_ownership` with `collection` in order for this operation to succeed.
 * 
 * Emits `OwnerChanged`.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_transfer_ownership {
    __kind: 'transfer_ownership'
    collection: number
    owner: MultiAddress
}

/**
 * Re-allow unprivileged transfer of an item.
 * 
 * Origin must be Signed and the sender should be the Freezer of the `collection`.
 * 
 * - `collection`: The collection of the item to be changed.
 * - `item`: The item to become transferable.
 * 
 * Emits `ItemTransferUnlocked`.
 * 
 * Weight: `O(1)`
 */
export interface NftCall_unlock_item_transfer {
    __kind: 'unlock_item_transfer'
    collection: number
    item: H256
}

/**
 * Update mint settings.
 * 
 * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Issuer
 * of the `collection`.
 * 
 * - `collection`: The identifier of the collection to change.
 * - `mint_settings`: The new mint settings.
 * 
 * Emits `CollectionMintSettingsUpdated` event when successful.
 */
export interface NftCall_update_mint_settings {
    __kind: 'update_mint_settings'
    collection: number
    mintSettings: MintSettings
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const MaintenanceModeCall: sts.Type<MaintenanceModeCall> = sts.closedEnum(() => {
    return  {
        enter_maintenance_mode: sts.unit(),
        resume_normal_operation: sts.unit(),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type MaintenanceModeCall = MaintenanceModeCall_enter_maintenance_mode | MaintenanceModeCall_resume_normal_operation

/**
 * Place the chain in maintenance mode
 * 
 * Weight cost is:
 * * One DB read to ensure we're not already in maintenance mode
 * * Three DB writes - 1 for the mode, 1 for suspending xcm execution, 1 for the event
 */
export interface MaintenanceModeCall_enter_maintenance_mode {
    __kind: 'enter_maintenance_mode'
}

/**
 * Return the chain to normal operating mode
 * 
 * Weight cost is:
 * * One DB read to ensure we're in maintenance mode
 * * Three DB writes - 1 for the mode, 1 for resuming xcm execution, 1 for the event
 */
export interface MaintenanceModeCall_resume_normal_operation {
    __kind: 'resume_normal_operation'
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const DmpQueueCall: sts.Type<DmpQueueCall> = sts.closedEnum(() => {
    return  {
        service_overweight: sts.enumStruct({
            index: sts.bigint(),
            weightLimit: Weight,
        }),
    }
})

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type DmpQueueCall = DmpQueueCall_service_overweight

/**
 * Service a single overweight message.
 */
export interface DmpQueueCall_service_overweight {
    __kind: 'service_overweight'
    index: bigint
    weightLimit: Weight
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const BalancesCall: sts.Type<BalancesCall> = sts.closedEnum(() => {
    return  {
        force_set_balance: sts.enumStruct({
            who: MultiAddress,
            newFree: sts.bigint(),
        }),
        force_transfer: sts.enumStruct({
            source: MultiAddress,
            dest: MultiAddress,
            value: sts.bigint(),
        }),
        force_unreserve: sts.enumStruct({
            who: MultiAddress,
            amount: sts.bigint(),
        }),
        set_balance_deprecated: sts.enumStruct({
            who: MultiAddress,
            newFree: sts.bigint(),
            oldReserved: sts.bigint(),
        }),
        transfer: sts.enumStruct({
            dest: MultiAddress,
            value: sts.bigint(),
        }),
        transfer_all: sts.enumStruct({
            dest: MultiAddress,
            keepAlive: sts.boolean(),
        }),
        transfer_allow_death: sts.enumStruct({
            dest: MultiAddress,
            value: sts.bigint(),
        }),
        transfer_keep_alive: sts.enumStruct({
            dest: MultiAddress,
            value: sts.bigint(),
        }),
        upgrade_accounts: sts.enumStruct({
            who: sts.array(() => AccountId32),
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
    who: MultiAddress
    newFree: bigint
}

/**
 * Exactly as `transfer_allow_death`, except the origin must be root and the source account
 * may be specified.
 */
export interface BalancesCall_force_transfer {
    __kind: 'force_transfer'
    source: MultiAddress
    dest: MultiAddress
    value: bigint
}

/**
 * Unreserve some balance from a user by force.
 * 
 * Can only be called by ROOT.
 */
export interface BalancesCall_force_unreserve {
    __kind: 'force_unreserve'
    who: MultiAddress
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
    who: MultiAddress
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
    dest: MultiAddress
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
    dest: MultiAddress
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
    dest: MultiAddress
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
    dest: MultiAddress
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
    who: AccountId32[]
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export const AwesomeAvatarsCall: sts.Type<AwesomeAvatarsCall> = sts.closedEnum(() => {
    return  {
        buy: sts.enumStruct({
            avatarId: H256,
        }),
        claim_treasury: sts.enumStruct({
            seasonId: sts.number(),
        }),
        forge: sts.enumStruct({
            leader: H256,
            sacrifices: sts.array(() => H256),
        }),
        lock_avatar: sts.enumStruct({
            avatarId: H256,
        }),
        mint: sts.enumStruct({
            mintOption: MintOption,
        }),
        prepare_avatar: sts.enumStruct({
            avatarId: H256,
        }),
        prepare_ipfs: sts.enumStruct({
            avatarId: H256,
            url: sts.bytes(),
        }),
        remove_price: sts.enumStruct({
            avatarId: H256,
        }),
        set_collection_id: sts.enumStruct({
            collectionId: sts.number(),
        }),
        set_free_mints: sts.enumStruct({
            target: AccountId32,
            howMany: sts.number(),
        }),
        set_organizer: sts.enumStruct({
            organizer: AccountId32,
        }),
        set_price: sts.enumStruct({
            avatarId: H256,
            price: sts.bigint(),
        }),
        set_season: sts.enumStruct({
            seasonId: sts.number(),
            season: Season,
        }),
        set_service_account: sts.enumStruct({
            serviceAccount: AccountId32,
        }),
        set_treasurer: sts.enumStruct({
            seasonId: sts.number(),
            treasurer: AccountId32,
        }),
        transfer_avatar: sts.enumStruct({
            to: AccountId32,
            avatarId: H256,
        }),
        transfer_free_mints: sts.enumStruct({
            to: AccountId32,
            howMany: sts.number(),
        }),
        unlock_avatar: sts.enumStruct({
            avatarId: H256,
        }),
        unprepare_avatar: sts.enumStruct({
            avatarId: H256,
        }),
        update_global_config: sts.enumStruct({
            newGlobalConfig: GlobalConfig,
        }),
        upgrade_storage: sts.enumStruct({
            beneficiary: sts.option(() => AccountId32),
            inSeason: sts.option(() => sts.number()),
        }),
    }
})

export const GlobalConfig: sts.Type<GlobalConfig> = sts.struct(() => {
    return  {
        mint: MintConfig,
        forge: ForgeConfig,
        transfer: TransferConfig,
        trade: TradeConfig,
        nftTransfer: NftTransferConfig,
    }
})

export const NftTransferConfig: sts.Type<NftTransferConfig> = sts.struct(() => {
    return  {
        open: sts.boolean(),
    }
})

export interface NftTransferConfig {
    open: boolean
}

export const TradeConfig: sts.Type<TradeConfig> = sts.struct(() => {
    return  {
        open: sts.boolean(),
    }
})

export interface TradeConfig {
    open: boolean
}

export const TransferConfig: sts.Type<TransferConfig> = sts.struct(() => {
    return  {
        open: sts.boolean(),
        freeMintTransferFee: sts.number(),
        minFreeMintTransfer: sts.number(),
    }
})

export interface TransferConfig {
    open: boolean
    freeMintTransferFee: number
    minFreeMintTransfer: number
}

export const ForgeConfig: sts.Type<ForgeConfig> = sts.struct(() => {
    return  {
        open: sts.boolean(),
    }
})

export interface ForgeConfig {
    open: boolean
}

export const MintConfig: sts.Type<MintConfig> = sts.struct(() => {
    return  {
        open: sts.boolean(),
        cooldown: sts.number(),
        freeMintFeeMultiplier: sts.number(),
    }
})

export interface MintConfig {
    open: boolean
    cooldown: number
    freeMintFeeMultiplier: number
}

export interface GlobalConfig {
    mint: MintConfig
    forge: ForgeConfig
    transfer: TransferConfig
    trade: TradeConfig
    nftTransfer: NftTransferConfig
}

export const Season: sts.Type<Season> = sts.struct(() => {
    return  {
        name: BoundedVec,
        description: sts.bytes(),
        earlyStart: sts.number(),
        start: sts.number(),
        end: sts.number(),
        maxTierForges: sts.number(),
        maxVariations: sts.number(),
        maxComponents: sts.number(),
        minSacrifices: sts.number(),
        maxSacrifices: sts.number(),
        tiers: sts.array(() => RarityTier),
        singleMintProbs: sts.bytes(),
        batchMintProbs: sts.bytes(),
        baseProb: sts.number(),
        perPeriod: sts.number(),
        periods: sts.number(),
        tradeFilters: sts.array(() => sts.number()),
        fee: Fee,
        mintLogic: LogicGeneration,
        forgeLogic: LogicGeneration,
    }
})

export const LogicGeneration: sts.Type<LogicGeneration> = sts.closedEnum(() => {
    return  {
        First: sts.unit(),
        Second: sts.unit(),
    }
})

export type LogicGeneration = LogicGeneration_First | LogicGeneration_Second

export interface LogicGeneration_First {
    __kind: 'First'
}

export interface LogicGeneration_Second {
    __kind: 'Second'
}

export const Fee: sts.Type<Fee> = sts.struct(() => {
    return  {
        mint: MintFees,
        transferAvatar: sts.bigint(),
        buyMinimum: sts.bigint(),
        buyPercent: sts.number(),
        upgradeStorage: sts.bigint(),
        prepareAvatar: sts.bigint(),
    }
})

export const MintFees: sts.Type<MintFees> = sts.struct(() => {
    return  {
        one: sts.bigint(),
        three: sts.bigint(),
        six: sts.bigint(),
    }
})

export interface MintFees {
    one: bigint
    three: bigint
    six: bigint
}

export interface Fee {
    mint: MintFees
    transferAvatar: bigint
    buyMinimum: bigint
    buyPercent: number
    upgradeStorage: bigint
    prepareAvatar: bigint
}

export const RarityTier: sts.Type<RarityTier> = sts.closedEnum(() => {
    return  {
        Common: sts.unit(),
        Epic: sts.unit(),
        Legendary: sts.unit(),
        Mythical: sts.unit(),
        None: sts.unit(),
        Rare: sts.unit(),
        Uncommon: sts.unit(),
    }
})

export type RarityTier = RarityTier_Common | RarityTier_Epic | RarityTier_Legendary | RarityTier_Mythical | RarityTier_None | RarityTier_Rare | RarityTier_Uncommon

export interface RarityTier_Common {
    __kind: 'Common'
}

export interface RarityTier_Epic {
    __kind: 'Epic'
}

export interface RarityTier_Legendary {
    __kind: 'Legendary'
}

export interface RarityTier_Mythical {
    __kind: 'Mythical'
}

export interface RarityTier_None {
    __kind: 'None'
}

export interface RarityTier_Rare {
    __kind: 'Rare'
}

export interface RarityTier_Uncommon {
    __kind: 'Uncommon'
}

export const BoundedVec = sts.bytes()

export interface Season {
    name: BoundedVec
    description: Bytes
    earlyStart: number
    start: number
    end: number
    maxTierForges: number
    maxVariations: number
    maxComponents: number
    minSacrifices: number
    maxSacrifices: number
    tiers: RarityTier[]
    singleMintProbs: Bytes
    batchMintProbs: Bytes
    baseProb: number
    perPeriod: number
    periods: number
    tradeFilters: number[]
    fee: Fee
    mintLogic: LogicGeneration
    forgeLogic: LogicGeneration
}

export type BoundedVec = Bytes

export const MintOption: sts.Type<MintOption> = sts.struct(() => {
    return  {
        payment: MintPayment,
        packType: PackType,
        packSize: MintPackSize,
    }
})

export const MintPackSize: sts.Type<MintPackSize> = sts.closedEnum(() => {
    return  {
        One: sts.unit(),
        Six: sts.unit(),
        Three: sts.unit(),
    }
})

export type MintPackSize = MintPackSize_One | MintPackSize_Six | MintPackSize_Three

export interface MintPackSize_One {
    __kind: 'One'
}

export interface MintPackSize_Six {
    __kind: 'Six'
}

export interface MintPackSize_Three {
    __kind: 'Three'
}

export const PackType: sts.Type<PackType> = sts.closedEnum(() => {
    return  {
        Equipment: sts.unit(),
        Material: sts.unit(),
        Special: sts.unit(),
    }
})

export type PackType = PackType_Equipment | PackType_Material | PackType_Special

export interface PackType_Equipment {
    __kind: 'Equipment'
}

export interface PackType_Material {
    __kind: 'Material'
}

export interface PackType_Special {
    __kind: 'Special'
}

export const MintPayment: sts.Type<MintPayment> = sts.closedEnum(() => {
    return  {
        Free: sts.unit(),
        Normal: sts.unit(),
    }
})

export type MintPayment = MintPayment_Free | MintPayment_Normal

export interface MintPayment_Free {
    __kind: 'Free'
}

export interface MintPayment_Normal {
    __kind: 'Normal'
}

export interface MintOption {
    payment: MintPayment
    packType: PackType
    packSize: MintPackSize
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type AwesomeAvatarsCall = AwesomeAvatarsCall_buy | AwesomeAvatarsCall_claim_treasury | AwesomeAvatarsCall_forge | AwesomeAvatarsCall_lock_avatar | AwesomeAvatarsCall_mint | AwesomeAvatarsCall_prepare_avatar | AwesomeAvatarsCall_prepare_ipfs | AwesomeAvatarsCall_remove_price | AwesomeAvatarsCall_set_collection_id | AwesomeAvatarsCall_set_free_mints | AwesomeAvatarsCall_set_organizer | AwesomeAvatarsCall_set_price | AwesomeAvatarsCall_set_season | AwesomeAvatarsCall_set_service_account | AwesomeAvatarsCall_set_treasurer | AwesomeAvatarsCall_transfer_avatar | AwesomeAvatarsCall_transfer_free_mints | AwesomeAvatarsCall_unlock_avatar | AwesomeAvatarsCall_unprepare_avatar | AwesomeAvatarsCall_update_global_config | AwesomeAvatarsCall_upgrade_storage

/**
 * Buy the given avatar.
 * 
 * It consumes tokens for the trade operation. The avatar will be owned by the
 * player after the transaction.
 * 
 * Only allowed while trade period is open.
 * 
 * Emits `AvatarTraded` event when successful.
 * 
 * Weight: `O(1)`
 */
export interface AwesomeAvatarsCall_buy {
    __kind: 'buy'
    avatarId: H256
}

/**
 * Claim treasury of a season.
 * 
 * The origin of this call must be signed by a treasurer account associated with the given
 * season ID. The treasurer of a season can claim the season's associated treasury once the
 * season finishes.
 * 
 * Weight: `O(1)`
 */
export interface AwesomeAvatarsCall_claim_treasury {
    __kind: 'claim_treasury'
    seasonId: number
}

/**
 * Forge an avatar.
 * 
 * This action can enhance the skills of an avatar by consuming a batch of avatars.
 * The minimum and maximum number of avatars that can be utilized for forging is
 * defined in the season configuration.
 * 
 * Emits `AvatarForged` event when successful.
 * 
 * Weight: `O(1)`
 */
export interface AwesomeAvatarsCall_forge {
    __kind: 'forge'
    leader: H256
    sacrifices: H256[]
}

/**
 * Locks an avatar to be tokenized as an NFT.
 * 
 * The origin of this call must specify an avatar, owned by the origin, to prevent it from
 * forging, trading and transferring it to other players. When successful, the ownership of
 * the avatar is transferred from the player to the pallet's technical account.
 * 
 * Locking an avatar allows for new
 * ways of interacting with it currently under development.
 * 
 * Weight: `O(n)` where:
 * - `n = max avatars per player`
 */
export interface AwesomeAvatarsCall_lock_avatar {
    __kind: 'lock_avatar'
    avatarId: H256
}

/**
 * Issue a new avatar.
 * 
 * Emits `AvatarsMinted` event when successful.
 * 
 * Weight: `O(n)` where:
 * - `n = max avatars per player`
 */
export interface AwesomeAvatarsCall_mint {
    __kind: 'mint'
    mintOption: MintOption
}

/**
 * Prepare an avatar to be uploaded to IPFS.
 * 
 * The origin of this call must specify an avatar, owned by the origin, to display the
 * intention of uploading it to an IPFS storage. When successful, the `PreparedAvatar`
 * event is emitted to be picked up by our external service that interacts with the IPFS.
 * 
 * Weight: `O(1)`
 */
export interface AwesomeAvatarsCall_prepare_avatar {
    __kind: 'prepare_avatar'
    avatarId: H256
}

/**
 * Prepare IPFS for an avatar.
 * 
 * The origin of this call must be signed by the service account to upload the given avatar
 * to an IPFS storage and stores its CID. A third-party service subscribes for the
 * `PreparedAvatar` events which triggers preparing assets, their upload to IPFS and
 * storing their CIDs.
 * Weight: `O(1)`
 */
export interface AwesomeAvatarsCall_prepare_ipfs {
    __kind: 'prepare_ipfs'
    avatarId: H256
    url: Bytes
}

/**
 * Remove the price of a given avatar.
 * 
 * Only allowed while trade period is open.
 * 
 * Emits `AvatarPriceUnset` event when successful.
 * 
 * Weight: `O(1)`
 */
export interface AwesomeAvatarsCall_remove_price {
    __kind: 'remove_price'
    avatarId: H256
}

/**
 * Set the collection ID to associate avatars with.
 * 
 * Externally created collection ID for avatars must be set in the `CollectionId` storage
 * to serve as a lookup for locking and unlocking avatars as NFTs.
 * 
 * Weight: `O(1)`
 */
export interface AwesomeAvatarsCall_set_collection_id {
    __kind: 'set_collection_id'
    collectionId: number
}

/**
 * Set free mints.
 * 
 * It can only be called by an organizer account.
 * 
 * Emits `FreeMintSet` event when successful.
 * 
 * Weight: `O(1)`
 */
export interface AwesomeAvatarsCall_set_free_mints {
    __kind: 'set_free_mints'
    target: AccountId32
    howMany: number
}

/**
 * Set game organizer.
 * 
 * The organizer account is like an admin, allowed to perform certain operations
 * related with the game configuration like `set_season`, `ensure_free_mint` and
 * `update_global_config`.
 * 
 * It can only be set by a root account.
 * 
 * Emits `OrganizerSet` event when successful.
 * 
 * Weight: `O(1)`
 */
export interface AwesomeAvatarsCall_set_organizer {
    __kind: 'set_organizer'
    organizer: AccountId32
}

/**
 * Set the price of a given avatar.
 * 
 * Only allowed while trade period is open.
 * 
 * Emits `AvatarPriceSet` event when successful.
 * 
 * Weight: `O(1)`
 */
export interface AwesomeAvatarsCall_set_price {
    __kind: 'set_price'
    avatarId: H256
    price: bigint
}

/**
 * Set season.
 * 
 * Creates a new season. The new season can overlap with the already existing.
 * 
 * It can only be set by an organizer account.
 * 
 * Emits `UpdatedSeason` event when successful.
 * 
 * Weight: `O(1)`
 */
export interface AwesomeAvatarsCall_set_season {
    __kind: 'set_season'
    seasonId: number
    season: Season
}

/**
 * Set a service account.
 * 
 * The origin of this call must be root. A service account has sufficient privilege to call
 * the `prepare_ipfs` extrinsic.
 * 
 * Weight: `O(1)`
 */
export interface AwesomeAvatarsCall_set_service_account {
    __kind: 'set_service_account'
    serviceAccount: AccountId32
}

/**
 * Set treasurer.
 * 
 * This is an additional treasury.
 * 
 * It can only be set by a root account.
 * 
 * Emits `TreasurerSet` event when successful.
 * 
 * Weight: `O(1)`
 */
export interface AwesomeAvatarsCall_set_treasurer {
    __kind: 'set_treasurer'
    seasonId: number
    treasurer: AccountId32
}

export interface AwesomeAvatarsCall_transfer_avatar {
    __kind: 'transfer_avatar'
    to: AccountId32
    avatarId: H256
}

/**
 * Transfer free mints to a given account.
 * 
 * Emits `FreeMintsTransferred` event when successful.
 * 
 * Weight: `O(1)`
 */
export interface AwesomeAvatarsCall_transfer_free_mints {
    __kind: 'transfer_free_mints'
    to: AccountId32
    howMany: number
}

/**
 * Unlocks an avatar removing its NFT representation.
 * 
 * The origin of this call must specify an avatar, owned and locked by the origin, to allow
 * forging, trading and transferring it to other players. When successful, the ownership of
 * the avatar is transferred from the pallet's technical account back to the player and its
 * existing NFT representation is destroyed.
 * 
 * Weight: `O(n)` where:
 * - `n = max avatars per player`
 */
export interface AwesomeAvatarsCall_unlock_avatar {
    __kind: 'unlock_avatar'
    avatarId: H256
}

/**
 * Unprepare an avatar to be detached from IPFS.
 * 
 * The origin of this call must specify an avatar, owned by the origin, that is undergoing
 * the IPFS upload process.
 * 
 * Weight: `O(1)`
 */
export interface AwesomeAvatarsCall_unprepare_avatar {
    __kind: 'unprepare_avatar'
    avatarId: H256
}

/**
 * Update global configuration.
 * 
 * It can only be called by an organizer account.
 * 
 * Emits `UpdatedGlobalConfig` event when successful.
 * 
 * Weight: `O(1)`
 */
export interface AwesomeAvatarsCall_update_global_config {
    __kind: 'update_global_config'
    newGlobalConfig: GlobalConfig
}

/**
 * Upgrade the avatar inventory space in a season.
 * 
 * * If called with a value in the **beneficiary** parameter, that account will receive the
 *   upgrade
 * instead of the caller.
 * * If the **in_season** parameter contains a value, this will set which specific season
 * will the storage be upgraded for, if no value is set then the current season will be the
 * one for which the storage will be upgraded.
 * 
 * In all cases the upgrade fees are **paid by the caller**.
 * 
 * Emits `StorageTierUpgraded` event when successful.
 * 
 * Weight: `O(1)`
 */
export interface AwesomeAvatarsCall_upgrade_storage {
    __kind: 'upgrade_storage'
    beneficiary?: (AccountId32 | undefined)
    inSeason?: (number | undefined)
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

export type Call = Call_AuthorInherent | Call_AuthoritiesNoting | Call_AwesomeAvatars | Call_Balances | Call_DmpQueue | Call_MaintenanceMode | Call_Nft | Call_ParachainInfo | Call_ParachainSystem | Call_PolkadotXcm | Call_Proxy | Call_Sudo | Call_System | Call_Timestamp | Call_Utility

export interface Call_AuthorInherent {
    __kind: 'AuthorInherent'
    value: AuthorInherentCall
}

export interface Call_AuthoritiesNoting {
    __kind: 'AuthoritiesNoting'
    value: AuthoritiesNotingCall
}

export interface Call_AwesomeAvatars {
    __kind: 'AwesomeAvatars'
    value: AwesomeAvatarsCall
}

export interface Call_Balances {
    __kind: 'Balances'
    value: BalancesCall
}

export interface Call_DmpQueue {
    __kind: 'DmpQueue'
    value: DmpQueueCall
}

export interface Call_MaintenanceMode {
    __kind: 'MaintenanceMode'
    value: MaintenanceModeCall
}

export interface Call_Nft {
    __kind: 'Nft'
    value: NftCall
}

export interface Call_ParachainInfo {
    __kind: 'ParachainInfo'
    value: ParachainInfoCall
}

export interface Call_ParachainSystem {
    __kind: 'ParachainSystem'
    value: ParachainSystemCall
}

export interface Call_PolkadotXcm {
    __kind: 'PolkadotXcm'
    value: PolkadotXcmCall
}

export interface Call_Proxy {
    __kind: 'Proxy'
    value: ProxyCall
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
