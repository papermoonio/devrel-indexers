import {sts, Result, Option, Bytes, BitSequence} from './support'

export const Call: sts.Type<Call> = sts.closedEnum(() => {
    return  {
        AuthorInherent: AuthorInherentCall,
        AuthoritiesNoting: AuthoritiesNotingCall,
        AwesomeAvatars: AwesomeAvatarsCall,
        Balances: BalancesCall,
        DmpQueue: DmpQueueCall,
        HexalemModule: HexalemModuleCall,
        MaintenanceMode: MaintenanceModeCall,
        Nft: NftCall,
        ParachainInfo: ParachainInfoCall,
        ParachainSystem: ParachainSystemCall,
        PolkadotXcm: PolkadotXcmCall,
        Proxy: ProxyCall,
        RootTesting: RootTestingCall,
        Sudo: SudoCall,
        System: SystemCall,
        Timestamp: TimestampCall,
        TxPause: TxPauseCall,
        Utility: UtilityCall,
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
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
        PolkadotXcm: Type_225,
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

export const Type_225: sts.Type<Type_225> = sts.closedEnum(() => {
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

export type Type_225 = Type_225_Response | Type_225_Xcm

export interface Type_225_Response {
    __kind: 'Response'
    value: V3MultiLocation
}

export interface Type_225_Xcm {
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
    value: Type_225
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
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type UtilityCall = UtilityCall_as_derivative | UtilityCall_batch | UtilityCall_batch_all | UtilityCall_dispatch_as | UtilityCall_force_batch | UtilityCall_with_weight

/**
 * See [`Pallet::as_derivative`].
 */
export interface UtilityCall_as_derivative {
    __kind: 'as_derivative'
    index: number
    call: Call
}

/**
 * See [`Pallet::batch`].
 */
export interface UtilityCall_batch {
    __kind: 'batch'
    calls: Call[]
}

/**
 * See [`Pallet::batch_all`].
 */
export interface UtilityCall_batch_all {
    __kind: 'batch_all'
    calls: Call[]
}

/**
 * See [`Pallet::dispatch_as`].
 */
export interface UtilityCall_dispatch_as {
    __kind: 'dispatch_as'
    asOrigin: OriginCaller
    call: Call
}

/**
 * See [`Pallet::force_batch`].
 */
export interface UtilityCall_force_batch {
    __kind: 'force_batch'
    calls: Call[]
}

/**
 * See [`Pallet::with_weight`].
 */
export interface UtilityCall_with_weight {
    __kind: 'with_weight'
    call: Call
    weight: Weight
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const TxPauseCall: sts.Type<TxPauseCall> = sts.closedEnum(() => {
    return  {
        pause: sts.enumStruct({
            fullName: sts.tuple(() => [BoundedVec, BoundedVec]),
        }),
        unpause: sts.enumStruct({
            ident: sts.tuple(() => [BoundedVec, BoundedVec]),
        }),
    }
})

export const BoundedVec = sts.bytes()

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type TxPauseCall = TxPauseCall_pause | TxPauseCall_unpause

/**
 * See [`Pallet::pause`].
 */
export interface TxPauseCall_pause {
    __kind: 'pause'
    fullName: [BoundedVec, BoundedVec]
}

/**
 * See [`Pallet::unpause`].
 */
export interface TxPauseCall_unpause {
    __kind: 'unpause'
    ident: [BoundedVec, BoundedVec]
}

export type BoundedVec = Bytes

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const TimestampCall: sts.Type<TimestampCall> = sts.closedEnum(() => {
    return  {
        set: sts.enumStruct({
            now: sts.bigint(),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type TimestampCall = TimestampCall_set

/**
 * See [`Pallet::set`].
 */
export interface TimestampCall_set {
    __kind: 'set'
    now: bigint
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
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
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type SystemCall = SystemCall_kill_prefix | SystemCall_kill_storage | SystemCall_remark | SystemCall_remark_with_event | SystemCall_set_code | SystemCall_set_code_without_checks | SystemCall_set_heap_pages | SystemCall_set_storage

/**
 * See [`Pallet::kill_prefix`].
 */
export interface SystemCall_kill_prefix {
    __kind: 'kill_prefix'
    prefix: Bytes
    subkeys: number
}

/**
 * See [`Pallet::kill_storage`].
 */
export interface SystemCall_kill_storage {
    __kind: 'kill_storage'
    keys: Bytes[]
}

/**
 * See [`Pallet::remark`].
 */
export interface SystemCall_remark {
    __kind: 'remark'
    remark: Bytes
}

/**
 * See [`Pallet::remark_with_event`].
 */
export interface SystemCall_remark_with_event {
    __kind: 'remark_with_event'
    remark: Bytes
}

/**
 * See [`Pallet::set_code`].
 */
export interface SystemCall_set_code {
    __kind: 'set_code'
    code: Bytes
}

/**
 * See [`Pallet::set_code_without_checks`].
 */
export interface SystemCall_set_code_without_checks {
    __kind: 'set_code_without_checks'
    code: Bytes
}

/**
 * See [`Pallet::set_heap_pages`].
 */
export interface SystemCall_set_heap_pages {
    __kind: 'set_heap_pages'
    pages: bigint
}

/**
 * See [`Pallet::set_storage`].
 */
export interface SystemCall_set_storage {
    __kind: 'set_storage'
    items: [Bytes, Bytes][]
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
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
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type SudoCall = SudoCall_set_key | SudoCall_sudo | SudoCall_sudo_as | SudoCall_sudo_unchecked_weight

/**
 * See [`Pallet::set_key`].
 */
export interface SudoCall_set_key {
    __kind: 'set_key'
    new: MultiAddress
}

/**
 * See [`Pallet::sudo`].
 */
export interface SudoCall_sudo {
    __kind: 'sudo'
    call: Call
}

/**
 * See [`Pallet::sudo_as`].
 */
export interface SudoCall_sudo_as {
    __kind: 'sudo_as'
    who: MultiAddress
    call: Call
}

/**
 * See [`Pallet::sudo_unchecked_weight`].
 */
export interface SudoCall_sudo_unchecked_weight {
    __kind: 'sudo_unchecked_weight'
    call: Call
    weight: Weight
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const RootTestingCall: sts.Type<RootTestingCall> = sts.closedEnum(() => {
    return  {
        fill_block: sts.enumStruct({
            ratio: Perbill,
        }),
    }
})

export const Perbill = sts.number()

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type RootTestingCall = RootTestingCall_fill_block

/**
 * See `Pallet::fill_block`.
 */
export interface RootTestingCall_fill_block {
    __kind: 'fill_block'
    ratio: Perbill
}

export type Perbill = number

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
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
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ProxyCall = ProxyCall_add_proxy | ProxyCall_announce | ProxyCall_create_pure | ProxyCall_kill_pure | ProxyCall_proxy | ProxyCall_proxy_announced | ProxyCall_reject_announcement | ProxyCall_remove_announcement | ProxyCall_remove_proxies | ProxyCall_remove_proxy

/**
 * See [`Pallet::add_proxy`].
 */
export interface ProxyCall_add_proxy {
    __kind: 'add_proxy'
    delegate: MultiAddress
    proxyType: ProxyType
    delay: number
}

/**
 * See [`Pallet::announce`].
 */
export interface ProxyCall_announce {
    __kind: 'announce'
    real: MultiAddress
    callHash: H256
}

/**
 * See [`Pallet::create_pure`].
 */
export interface ProxyCall_create_pure {
    __kind: 'create_pure'
    proxyType: ProxyType
    delay: number
    index: number
}

/**
 * See [`Pallet::kill_pure`].
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
 * See [`Pallet::proxy`].
 */
export interface ProxyCall_proxy {
    __kind: 'proxy'
    real: MultiAddress
    forceProxyType?: (ProxyType | undefined)
    call: Call
}

/**
 * See [`Pallet::proxy_announced`].
 */
export interface ProxyCall_proxy_announced {
    __kind: 'proxy_announced'
    delegate: MultiAddress
    real: MultiAddress
    forceProxyType?: (ProxyType | undefined)
    call: Call
}

/**
 * See [`Pallet::reject_announcement`].
 */
export interface ProxyCall_reject_announcement {
    __kind: 'reject_announcement'
    delegate: MultiAddress
    callHash: H256
}

/**
 * See [`Pallet::remove_announcement`].
 */
export interface ProxyCall_remove_announcement {
    __kind: 'remove_announcement'
    real: MultiAddress
    callHash: H256
}

/**
 * See [`Pallet::remove_proxies`].
 */
export interface ProxyCall_remove_proxies {
    __kind: 'remove_proxies'
}

/**
 * See [`Pallet::remove_proxy`].
 */
export interface ProxyCall_remove_proxy {
    __kind: 'remove_proxy'
    delegate: MultiAddress
    proxyType: ProxyType
    delay: number
}

export type H256 = Bytes

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const PolkadotXcmCall: sts.Type<PolkadotXcmCall> = sts.closedEnum(() => {
    return  {
        execute: sts.enumStruct({
            message: Type_284,
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
            version: sts.number(),
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

export const Type_284: sts.Type<Type_284> = sts.closedEnum(() => {
    return  {
        V2: sts.array(() => Type_287),
        V3: sts.array(() => Type_291),
    }
})

export const Type_291: sts.Type<Type_291> = sts.closedEnum(() => {
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
        SetAppendix: sts.array(() => Type_291),
        SetErrorHandler: sts.array(() => Type_291),
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
            call: Type_288,
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

export const Type_288: sts.Type<Type_288> = sts.struct(() => {
    return  {
        encoded: sts.bytes(),
    }
})

export interface Type_288 {
    encoded: Bytes
}

export type Type_291 = Type_291_AliasOrigin | Type_291_BurnAsset | Type_291_BuyExecution | Type_291_ClaimAsset | Type_291_ClearError | Type_291_ClearOrigin | Type_291_ClearTopic | Type_291_ClearTransactStatus | Type_291_DepositAsset | Type_291_DepositReserveAsset | Type_291_DescendOrigin | Type_291_ExchangeAsset | Type_291_ExpectAsset | Type_291_ExpectError | Type_291_ExpectOrigin | Type_291_ExpectPallet | Type_291_ExpectTransactStatus | Type_291_ExportMessage | Type_291_HrmpChannelAccepted | Type_291_HrmpChannelClosing | Type_291_HrmpNewChannelOpenRequest | Type_291_InitiateReserveWithdraw | Type_291_InitiateTeleport | Type_291_LockAsset | Type_291_NoteUnlockable | Type_291_QueryPallet | Type_291_QueryResponse | Type_291_ReceiveTeleportedAsset | Type_291_RefundSurplus | Type_291_ReportError | Type_291_ReportHolding | Type_291_ReportTransactStatus | Type_291_RequestUnlock | Type_291_ReserveAssetDeposited | Type_291_SetAppendix | Type_291_SetErrorHandler | Type_291_SetFeesMode | Type_291_SetTopic | Type_291_SubscribeVersion | Type_291_Transact | Type_291_TransferAsset | Type_291_TransferReserveAsset | Type_291_Trap | Type_291_UniversalOrigin | Type_291_UnlockAsset | Type_291_UnpaidExecution | Type_291_UnsubscribeVersion | Type_291_WithdrawAsset

export interface Type_291_AliasOrigin {
    __kind: 'AliasOrigin'
    value: V3MultiLocation
}

export interface Type_291_BurnAsset {
    __kind: 'BurnAsset'
    value: V3MultiAsset[]
}

export interface Type_291_BuyExecution {
    __kind: 'BuyExecution'
    fees: V3MultiAsset
    weightLimit: V3WeightLimit
}

export interface Type_291_ClaimAsset {
    __kind: 'ClaimAsset'
    assets: V3MultiAsset[]
    ticket: V3MultiLocation
}

export interface Type_291_ClearError {
    __kind: 'ClearError'
}

export interface Type_291_ClearOrigin {
    __kind: 'ClearOrigin'
}

export interface Type_291_ClearTopic {
    __kind: 'ClearTopic'
}

export interface Type_291_ClearTransactStatus {
    __kind: 'ClearTransactStatus'
}

export interface Type_291_DepositAsset {
    __kind: 'DepositAsset'
    assets: V3MultiAssetFilter
    beneficiary: V3MultiLocation
}

export interface Type_291_DepositReserveAsset {
    __kind: 'DepositReserveAsset'
    assets: V3MultiAssetFilter
    dest: V3MultiLocation
    xcm: V3Instruction[]
}

export interface Type_291_DescendOrigin {
    __kind: 'DescendOrigin'
    value: V3Junctions
}

export interface Type_291_ExchangeAsset {
    __kind: 'ExchangeAsset'
    give: V3MultiAssetFilter
    want: V3MultiAsset[]
    maximal: boolean
}

export interface Type_291_ExpectAsset {
    __kind: 'ExpectAsset'
    value: V3MultiAsset[]
}

export interface Type_291_ExpectError {
    __kind: 'ExpectError'
    value?: ([number, V3Error] | undefined)
}

export interface Type_291_ExpectOrigin {
    __kind: 'ExpectOrigin'
    value?: (V3MultiLocation | undefined)
}

export interface Type_291_ExpectPallet {
    __kind: 'ExpectPallet'
    index: number
    name: Bytes
    moduleName: Bytes
    crateMajor: number
    minCrateMinor: number
}

export interface Type_291_ExpectTransactStatus {
    __kind: 'ExpectTransactStatus'
    value: V3MaybeErrorCode
}

export interface Type_291_ExportMessage {
    __kind: 'ExportMessage'
    network: V3NetworkId
    destination: V3Junctions
    xcm: V3Instruction[]
}

export interface Type_291_HrmpChannelAccepted {
    __kind: 'HrmpChannelAccepted'
    recipient: number
}

export interface Type_291_HrmpChannelClosing {
    __kind: 'HrmpChannelClosing'
    initiator: number
    sender: number
    recipient: number
}

export interface Type_291_HrmpNewChannelOpenRequest {
    __kind: 'HrmpNewChannelOpenRequest'
    sender: number
    maxMessageSize: number
    maxCapacity: number
}

export interface Type_291_InitiateReserveWithdraw {
    __kind: 'InitiateReserveWithdraw'
    assets: V3MultiAssetFilter
    reserve: V3MultiLocation
    xcm: V3Instruction[]
}

export interface Type_291_InitiateTeleport {
    __kind: 'InitiateTeleport'
    assets: V3MultiAssetFilter
    dest: V3MultiLocation
    xcm: V3Instruction[]
}

export interface Type_291_LockAsset {
    __kind: 'LockAsset'
    asset: V3MultiAsset
    unlocker: V3MultiLocation
}

export interface Type_291_NoteUnlockable {
    __kind: 'NoteUnlockable'
    asset: V3MultiAsset
    owner: V3MultiLocation
}

export interface Type_291_QueryPallet {
    __kind: 'QueryPallet'
    moduleName: Bytes
    responseInfo: V3QueryResponseInfo
}

export interface Type_291_QueryResponse {
    __kind: 'QueryResponse'
    queryId: bigint
    response: V3Response
    maxWeight: Weight
    querier?: (V3MultiLocation | undefined)
}

export interface Type_291_ReceiveTeleportedAsset {
    __kind: 'ReceiveTeleportedAsset'
    value: V3MultiAsset[]
}

export interface Type_291_RefundSurplus {
    __kind: 'RefundSurplus'
}

export interface Type_291_ReportError {
    __kind: 'ReportError'
    value: V3QueryResponseInfo
}

export interface Type_291_ReportHolding {
    __kind: 'ReportHolding'
    responseInfo: V3QueryResponseInfo
    assets: V3MultiAssetFilter
}

export interface Type_291_ReportTransactStatus {
    __kind: 'ReportTransactStatus'
    value: V3QueryResponseInfo
}

export interface Type_291_RequestUnlock {
    __kind: 'RequestUnlock'
    asset: V3MultiAsset
    locker: V3MultiLocation
}

export interface Type_291_ReserveAssetDeposited {
    __kind: 'ReserveAssetDeposited'
    value: V3MultiAsset[]
}

export interface Type_291_SetAppendix {
    __kind: 'SetAppendix'
    value: Type_291[]
}

export interface Type_291_SetErrorHandler {
    __kind: 'SetErrorHandler'
    value: Type_291[]
}

export interface Type_291_SetFeesMode {
    __kind: 'SetFeesMode'
    jitWithdraw: boolean
}

export interface Type_291_SetTopic {
    __kind: 'SetTopic'
    value: Bytes
}

export interface Type_291_SubscribeVersion {
    __kind: 'SubscribeVersion'
    queryId: bigint
    maxResponseWeight: Weight
}

export interface Type_291_Transact {
    __kind: 'Transact'
    originKind: V2OriginKind
    requireWeightAtMost: Weight
    call: Type_288
}

export interface Type_291_TransferAsset {
    __kind: 'TransferAsset'
    assets: V3MultiAsset[]
    beneficiary: V3MultiLocation
}

export interface Type_291_TransferReserveAsset {
    __kind: 'TransferReserveAsset'
    assets: V3MultiAsset[]
    dest: V3MultiLocation
    xcm: V3Instruction[]
}

export interface Type_291_Trap {
    __kind: 'Trap'
    value: bigint
}

export interface Type_291_UniversalOrigin {
    __kind: 'UniversalOrigin'
    value: V3Junction
}

export interface Type_291_UnlockAsset {
    __kind: 'UnlockAsset'
    asset: V3MultiAsset
    target: V3MultiLocation
}

export interface Type_291_UnpaidExecution {
    __kind: 'UnpaidExecution'
    weightLimit: V3WeightLimit
    checkOrigin?: (V3MultiLocation | undefined)
}

export interface Type_291_UnsubscribeVersion {
    __kind: 'UnsubscribeVersion'
}

export interface Type_291_WithdrawAsset {
    __kind: 'WithdrawAsset'
    value: V3MultiAsset[]
}

export const Type_287: sts.Type<Type_287> = sts.closedEnum(() => {
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
        SetAppendix: sts.array(() => Type_287),
        SetErrorHandler: sts.array(() => Type_287),
        SubscribeVersion: sts.enumStruct({
            queryId: sts.bigint(),
            maxResponseWeight: sts.bigint(),
        }),
        Transact: sts.enumStruct({
            originType: V2OriginKind,
            requireWeightAtMost: sts.bigint(),
            call: Type_288,
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

export type Type_287 = Type_287_BuyExecution | Type_287_ClaimAsset | Type_287_ClearError | Type_287_ClearOrigin | Type_287_DepositAsset | Type_287_DepositReserveAsset | Type_287_DescendOrigin | Type_287_ExchangeAsset | Type_287_HrmpChannelAccepted | Type_287_HrmpChannelClosing | Type_287_HrmpNewChannelOpenRequest | Type_287_InitiateReserveWithdraw | Type_287_InitiateTeleport | Type_287_QueryHolding | Type_287_QueryResponse | Type_287_ReceiveTeleportedAsset | Type_287_RefundSurplus | Type_287_ReportError | Type_287_ReserveAssetDeposited | Type_287_SetAppendix | Type_287_SetErrorHandler | Type_287_SubscribeVersion | Type_287_Transact | Type_287_TransferAsset | Type_287_TransferReserveAsset | Type_287_Trap | Type_287_UnsubscribeVersion | Type_287_WithdrawAsset

export interface Type_287_BuyExecution {
    __kind: 'BuyExecution'
    fees: V2MultiAsset
    weightLimit: V2WeightLimit
}

export interface Type_287_ClaimAsset {
    __kind: 'ClaimAsset'
    assets: V2MultiAsset[]
    ticket: V2MultiLocation
}

export interface Type_287_ClearError {
    __kind: 'ClearError'
}

export interface Type_287_ClearOrigin {
    __kind: 'ClearOrigin'
}

export interface Type_287_DepositAsset {
    __kind: 'DepositAsset'
    assets: V2MultiAssetFilter
    maxAssets: number
    beneficiary: V2MultiLocation
}

export interface Type_287_DepositReserveAsset {
    __kind: 'DepositReserveAsset'
    assets: V2MultiAssetFilter
    maxAssets: number
    dest: V2MultiLocation
    xcm: V2Instruction[]
}

export interface Type_287_DescendOrigin {
    __kind: 'DescendOrigin'
    value: V2Junctions
}

export interface Type_287_ExchangeAsset {
    __kind: 'ExchangeAsset'
    give: V2MultiAssetFilter
    receive: V2MultiAsset[]
}

export interface Type_287_HrmpChannelAccepted {
    __kind: 'HrmpChannelAccepted'
    recipient: number
}

export interface Type_287_HrmpChannelClosing {
    __kind: 'HrmpChannelClosing'
    initiator: number
    sender: number
    recipient: number
}

export interface Type_287_HrmpNewChannelOpenRequest {
    __kind: 'HrmpNewChannelOpenRequest'
    sender: number
    maxMessageSize: number
    maxCapacity: number
}

export interface Type_287_InitiateReserveWithdraw {
    __kind: 'InitiateReserveWithdraw'
    assets: V2MultiAssetFilter
    reserve: V2MultiLocation
    xcm: V2Instruction[]
}

export interface Type_287_InitiateTeleport {
    __kind: 'InitiateTeleport'
    assets: V2MultiAssetFilter
    dest: V2MultiLocation
    xcm: V2Instruction[]
}

export interface Type_287_QueryHolding {
    __kind: 'QueryHolding'
    queryId: bigint
    dest: V2MultiLocation
    assets: V2MultiAssetFilter
    maxResponseWeight: bigint
}

export interface Type_287_QueryResponse {
    __kind: 'QueryResponse'
    queryId: bigint
    response: V2Response
    maxWeight: bigint
}

export interface Type_287_ReceiveTeleportedAsset {
    __kind: 'ReceiveTeleportedAsset'
    value: V2MultiAsset[]
}

export interface Type_287_RefundSurplus {
    __kind: 'RefundSurplus'
}

export interface Type_287_ReportError {
    __kind: 'ReportError'
    queryId: bigint
    dest: V2MultiLocation
    maxResponseWeight: bigint
}

export interface Type_287_ReserveAssetDeposited {
    __kind: 'ReserveAssetDeposited'
    value: V2MultiAsset[]
}

export interface Type_287_SetAppendix {
    __kind: 'SetAppendix'
    value: Type_287[]
}

export interface Type_287_SetErrorHandler {
    __kind: 'SetErrorHandler'
    value: Type_287[]
}

export interface Type_287_SubscribeVersion {
    __kind: 'SubscribeVersion'
    queryId: bigint
    maxResponseWeight: bigint
}

export interface Type_287_Transact {
    __kind: 'Transact'
    originType: V2OriginKind
    requireWeightAtMost: bigint
    call: Type_288
}

export interface Type_287_TransferAsset {
    __kind: 'TransferAsset'
    assets: V2MultiAsset[]
    beneficiary: V2MultiLocation
}

export interface Type_287_TransferReserveAsset {
    __kind: 'TransferReserveAsset'
    assets: V2MultiAsset[]
    dest: V2MultiLocation
    xcm: V2Instruction[]
}

export interface Type_287_Trap {
    __kind: 'Trap'
    value: bigint
}

export interface Type_287_UnsubscribeVersion {
    __kind: 'UnsubscribeVersion'
}

export interface Type_287_WithdrawAsset {
    __kind: 'WithdrawAsset'
    value: V2MultiAsset[]
}

export type Type_284 = Type_284_V2 | Type_284_V3

export interface Type_284_V2 {
    __kind: 'V2'
    value: Type_287[]
}

export interface Type_284_V3 {
    __kind: 'V3'
    value: Type_291[]
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type PolkadotXcmCall = PolkadotXcmCall_execute | PolkadotXcmCall_force_default_xcm_version | PolkadotXcmCall_force_subscribe_version_notify | PolkadotXcmCall_force_suspension | PolkadotXcmCall_force_unsubscribe_version_notify | PolkadotXcmCall_force_xcm_version | PolkadotXcmCall_limited_reserve_transfer_assets | PolkadotXcmCall_limited_teleport_assets | PolkadotXcmCall_reserve_transfer_assets | PolkadotXcmCall_send | PolkadotXcmCall_teleport_assets

/**
 * See [`Pallet::execute`].
 */
export interface PolkadotXcmCall_execute {
    __kind: 'execute'
    message: Type_284
    maxWeight: Weight
}

/**
 * See [`Pallet::force_default_xcm_version`].
 */
export interface PolkadotXcmCall_force_default_xcm_version {
    __kind: 'force_default_xcm_version'
    maybeXcmVersion?: (number | undefined)
}

/**
 * See [`Pallet::force_subscribe_version_notify`].
 */
export interface PolkadotXcmCall_force_subscribe_version_notify {
    __kind: 'force_subscribe_version_notify'
    location: VersionedMultiLocation
}

/**
 * See [`Pallet::force_suspension`].
 */
export interface PolkadotXcmCall_force_suspension {
    __kind: 'force_suspension'
    suspended: boolean
}

/**
 * See [`Pallet::force_unsubscribe_version_notify`].
 */
export interface PolkadotXcmCall_force_unsubscribe_version_notify {
    __kind: 'force_unsubscribe_version_notify'
    location: VersionedMultiLocation
}

/**
 * See [`Pallet::force_xcm_version`].
 */
export interface PolkadotXcmCall_force_xcm_version {
    __kind: 'force_xcm_version'
    location: V3MultiLocation
    version: number
}

/**
 * See [`Pallet::limited_reserve_transfer_assets`].
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
 * See [`Pallet::limited_teleport_assets`].
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
 * See [`Pallet::reserve_transfer_assets`].
 */
export interface PolkadotXcmCall_reserve_transfer_assets {
    __kind: 'reserve_transfer_assets'
    dest: VersionedMultiLocation
    beneficiary: VersionedMultiLocation
    assets: VersionedMultiAssets
    feeAssetItem: number
}

/**
 * See [`Pallet::send`].
 */
export interface PolkadotXcmCall_send {
    __kind: 'send'
    dest: VersionedMultiLocation
    message: VersionedXcm
}

/**
 * See [`Pallet::teleport_assets`].
 */
export interface PolkadotXcmCall_teleport_assets {
    __kind: 'teleport_assets'
    dest: VersionedMultiLocation
    beneficiary: VersionedMultiLocation
    assets: VersionedMultiAssets
    feeAssetItem: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
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
        validationData: V6PersistedValidationData,
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

export const V6PersistedValidationData: sts.Type<V6PersistedValidationData> = sts.struct(() => {
    return  {
        parentHead: HeadData,
        relayParentNumber: sts.number(),
        relayParentStorageRoot: H256,
        maxPovSize: sts.number(),
    }
})

export const HeadData = sts.bytes()

export interface V6PersistedValidationData {
    parentHead: HeadData
    relayParentNumber: number
    relayParentStorageRoot: H256
    maxPovSize: number
}

export type HeadData = Bytes

export interface ParachainInherentData {
    validationData: V6PersistedValidationData
    relayChainState: StorageProof
    downwardMessages: InboundDownwardMessage[]
    horizontalMessages: [Id, InboundHrmpMessage[]][]
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ParachainSystemCall = ParachainSystemCall_authorize_upgrade | ParachainSystemCall_enact_authorized_upgrade | ParachainSystemCall_set_validation_data | ParachainSystemCall_sudo_send_upward_message

/**
 * See [`Pallet::authorize_upgrade`].
 */
export interface ParachainSystemCall_authorize_upgrade {
    __kind: 'authorize_upgrade'
    codeHash: H256
    checkVersion: boolean
}

/**
 * See [`Pallet::enact_authorized_upgrade`].
 */
export interface ParachainSystemCall_enact_authorized_upgrade {
    __kind: 'enact_authorized_upgrade'
    code: Bytes
}

/**
 * See [`Pallet::set_validation_data`].
 */
export interface ParachainSystemCall_set_validation_data {
    __kind: 'set_validation_data'
    data: ParachainInherentData
}

/**
 * See [`Pallet::sudo_send_upward_message`].
 */
export interface ParachainSystemCall_sudo_send_upward_message {
    __kind: 'sudo_send_upward_message'
    message: Bytes
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const ParachainInfoCall: sts.Type<ParachainInfoCall> = sts.closedEnum(() => {
    return  {
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ParachainInfoCall = never

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
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
        mintPrice: sts.option(() => sts.bigint()),
    }
})

export interface PreSignedMint {
    collection: number
    item: H256
    attributes: [Bytes, Bytes][]
    metadata: Bytes
    onlyAccount?: (AccountId32 | undefined)
    deadline: number
    mintPrice?: (bigint | undefined)
}

export const MintWitness: sts.Type<MintWitness> = sts.struct(() => {
    return  {
        ownedItem: sts.option(() => H256),
        mintPrice: sts.option(() => sts.bigint()),
    }
})

export interface MintWitness {
    ownedItem?: (H256 | undefined)
    mintPrice?: (bigint | undefined)
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
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type NftCall = NftCall_approve_item_attributes | NftCall_approve_transfer | NftCall_burn | NftCall_buy_item | NftCall_cancel_approval | NftCall_cancel_item_attributes_approval | NftCall_cancel_swap | NftCall_claim_swap | NftCall_clear_all_transfer_approvals | NftCall_clear_attribute | NftCall_clear_collection_metadata | NftCall_clear_metadata | NftCall_create | NftCall_create_swap | NftCall_destroy | NftCall_force_collection_config | NftCall_force_collection_owner | NftCall_force_create | NftCall_force_mint | NftCall_force_set_attribute | NftCall_lock_collection | NftCall_lock_item_properties | NftCall_lock_item_transfer | NftCall_mint | NftCall_mint_pre_signed | NftCall_pay_tips | NftCall_redeposit | NftCall_set_accept_ownership | NftCall_set_attribute | NftCall_set_attributes_pre_signed | NftCall_set_collection_max_supply | NftCall_set_collection_metadata | NftCall_set_metadata | NftCall_set_price | NftCall_set_team | NftCall_transfer | NftCall_transfer_ownership | NftCall_unlock_item_transfer | NftCall_update_mint_settings

/**
 * See [`Pallet::approve_item_attributes`].
 */
export interface NftCall_approve_item_attributes {
    __kind: 'approve_item_attributes'
    collection: number
    item: H256
    delegate: MultiAddress
}

/**
 * See [`Pallet::approve_transfer`].
 */
export interface NftCall_approve_transfer {
    __kind: 'approve_transfer'
    collection: number
    item: H256
    delegate: MultiAddress
    maybeDeadline?: (number | undefined)
}

/**
 * See [`Pallet::burn`].
 */
export interface NftCall_burn {
    __kind: 'burn'
    collection: number
    item: H256
}

/**
 * See [`Pallet::buy_item`].
 */
export interface NftCall_buy_item {
    __kind: 'buy_item'
    collection: number
    item: H256
    bidPrice: bigint
}

/**
 * See [`Pallet::cancel_approval`].
 */
export interface NftCall_cancel_approval {
    __kind: 'cancel_approval'
    collection: number
    item: H256
    delegate: MultiAddress
}

/**
 * See [`Pallet::cancel_item_attributes_approval`].
 */
export interface NftCall_cancel_item_attributes_approval {
    __kind: 'cancel_item_attributes_approval'
    collection: number
    item: H256
    delegate: MultiAddress
    witness: CancelAttributesApprovalWitness
}

/**
 * See [`Pallet::cancel_swap`].
 */
export interface NftCall_cancel_swap {
    __kind: 'cancel_swap'
    offeredCollection: number
    offeredItem: H256
}

/**
 * See [`Pallet::claim_swap`].
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
 * See [`Pallet::clear_all_transfer_approvals`].
 */
export interface NftCall_clear_all_transfer_approvals {
    __kind: 'clear_all_transfer_approvals'
    collection: number
    item: H256
}

/**
 * See [`Pallet::clear_attribute`].
 */
export interface NftCall_clear_attribute {
    __kind: 'clear_attribute'
    collection: number
    maybeItem?: (H256 | undefined)
    namespace: AttributeNamespace
    key: Bytes
}

/**
 * See [`Pallet::clear_collection_metadata`].
 */
export interface NftCall_clear_collection_metadata {
    __kind: 'clear_collection_metadata'
    collection: number
}

/**
 * See [`Pallet::clear_metadata`].
 */
export interface NftCall_clear_metadata {
    __kind: 'clear_metadata'
    collection: number
    item: H256
}

/**
 * See [`Pallet::create`].
 */
export interface NftCall_create {
    __kind: 'create'
    admin: MultiAddress
    config: CollectionConfig
}

/**
 * See [`Pallet::create_swap`].
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
 * See [`Pallet::destroy`].
 */
export interface NftCall_destroy {
    __kind: 'destroy'
    collection: number
    witness: DestroyWitness
}

/**
 * See [`Pallet::force_collection_config`].
 */
export interface NftCall_force_collection_config {
    __kind: 'force_collection_config'
    collection: number
    config: CollectionConfig
}

/**
 * See [`Pallet::force_collection_owner`].
 */
export interface NftCall_force_collection_owner {
    __kind: 'force_collection_owner'
    collection: number
    owner: MultiAddress
}

/**
 * See [`Pallet::force_create`].
 */
export interface NftCall_force_create {
    __kind: 'force_create'
    owner: MultiAddress
    config: CollectionConfig
}

/**
 * See [`Pallet::force_mint`].
 */
export interface NftCall_force_mint {
    __kind: 'force_mint'
    collection: number
    item: H256
    mintTo: MultiAddress
    itemConfig: ItemConfig
}

/**
 * See [`Pallet::force_set_attribute`].
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
 * See [`Pallet::lock_collection`].
 */
export interface NftCall_lock_collection {
    __kind: 'lock_collection'
    collection: number
    lockSettings: BitFlags
}

/**
 * See [`Pallet::lock_item_properties`].
 */
export interface NftCall_lock_item_properties {
    __kind: 'lock_item_properties'
    collection: number
    item: H256
    lockMetadata: boolean
    lockAttributes: boolean
}

/**
 * See [`Pallet::lock_item_transfer`].
 */
export interface NftCall_lock_item_transfer {
    __kind: 'lock_item_transfer'
    collection: number
    item: H256
}

/**
 * See [`Pallet::mint`].
 */
export interface NftCall_mint {
    __kind: 'mint'
    collection: number
    item: H256
    mintTo: MultiAddress
    witnessData?: (MintWitness | undefined)
}

/**
 * See [`Pallet::mint_pre_signed`].
 */
export interface NftCall_mint_pre_signed {
    __kind: 'mint_pre_signed'
    mintData: PreSignedMint
    signature: MultiSignature
    signer: AccountId32
}

/**
 * See [`Pallet::pay_tips`].
 */
export interface NftCall_pay_tips {
    __kind: 'pay_tips'
    tips: ItemTip[]
}

/**
 * See [`Pallet::redeposit`].
 */
export interface NftCall_redeposit {
    __kind: 'redeposit'
    collection: number
    items: H256[]
}

/**
 * See [`Pallet::set_accept_ownership`].
 */
export interface NftCall_set_accept_ownership {
    __kind: 'set_accept_ownership'
    maybeCollection?: (number | undefined)
}

/**
 * See [`Pallet::set_attribute`].
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
 * See [`Pallet::set_attributes_pre_signed`].
 */
export interface NftCall_set_attributes_pre_signed {
    __kind: 'set_attributes_pre_signed'
    data: PreSignedAttributes
    signature: MultiSignature
    signer: AccountId32
}

/**
 * See [`Pallet::set_collection_max_supply`].
 */
export interface NftCall_set_collection_max_supply {
    __kind: 'set_collection_max_supply'
    collection: number
    maxSupply: number
}

/**
 * See [`Pallet::set_collection_metadata`].
 */
export interface NftCall_set_collection_metadata {
    __kind: 'set_collection_metadata'
    collection: number
    data: Bytes
}

/**
 * See [`Pallet::set_metadata`].
 */
export interface NftCall_set_metadata {
    __kind: 'set_metadata'
    collection: number
    item: H256
    data: Bytes
}

/**
 * See [`Pallet::set_price`].
 */
export interface NftCall_set_price {
    __kind: 'set_price'
    collection: number
    item: H256
    price?: (bigint | undefined)
    whitelistedBuyer?: (MultiAddress | undefined)
}

/**
 * See [`Pallet::set_team`].
 */
export interface NftCall_set_team {
    __kind: 'set_team'
    collection: number
    issuer?: (MultiAddress | undefined)
    admin?: (MultiAddress | undefined)
    freezer?: (MultiAddress | undefined)
}

/**
 * See [`Pallet::transfer`].
 */
export interface NftCall_transfer {
    __kind: 'transfer'
    collection: number
    item: H256
    dest: MultiAddress
}

/**
 * See [`Pallet::transfer_ownership`].
 */
export interface NftCall_transfer_ownership {
    __kind: 'transfer_ownership'
    collection: number
    owner: MultiAddress
}

/**
 * See [`Pallet::unlock_item_transfer`].
 */
export interface NftCall_unlock_item_transfer {
    __kind: 'unlock_item_transfer'
    collection: number
    item: H256
}

/**
 * See [`Pallet::update_mint_settings`].
 */
export interface NftCall_update_mint_settings {
    __kind: 'update_mint_settings'
    collection: number
    mintSettings: MintSettings
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const MaintenanceModeCall: sts.Type<MaintenanceModeCall> = sts.closedEnum(() => {
    return  {
        enter_maintenance_mode: sts.unit(),
        resume_normal_operation: sts.unit(),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type MaintenanceModeCall = MaintenanceModeCall_enter_maintenance_mode | MaintenanceModeCall_resume_normal_operation

/**
 * See [`Pallet::enter_maintenance_mode`].
 */
export interface MaintenanceModeCall_enter_maintenance_mode {
    __kind: 'enter_maintenance_mode'
}

/**
 * See [`Pallet::resume_normal_operation`].
 */
export interface MaintenanceModeCall_resume_normal_operation {
    __kind: 'resume_normal_operation'
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const HexalemModuleCall: sts.Type<HexalemModuleCall> = sts.closedEnum(() => {
    return  {
        create_game: sts.enumStruct({
            players: sts.array(() => AccountId32),
            gridSize: sts.number(),
        }),
        finish_turn: sts.unit(),
        force_finish_turn: sts.enumStruct({
            gameId: sts.bytes(),
        }),
        play: sts.enumStruct({
            movePlayed: Move,
        }),
        receive_reward: sts.unit(),
        root_delete_game: sts.enumStruct({
            gameId: sts.bytes(),
        }),
        upgrade: sts.enumStruct({
            placeIndex: sts.number(),
        }),
    }
})

export const Move: sts.Type<Move> = sts.struct(() => {
    return  {
        placeIndex: sts.number(),
        buyIndex: sts.number(),
    }
})

export interface Move {
    placeIndex: number
    buyIndex: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type HexalemModuleCall = HexalemModuleCall_create_game | HexalemModuleCall_finish_turn | HexalemModuleCall_force_finish_turn | HexalemModuleCall_play | HexalemModuleCall_receive_reward | HexalemModuleCall_root_delete_game | HexalemModuleCall_upgrade

/**
 * See [`Pallet::create_game`].
 */
export interface HexalemModuleCall_create_game {
    __kind: 'create_game'
    players: AccountId32[]
    gridSize: number
}

/**
 * See [`Pallet::finish_turn`].
 */
export interface HexalemModuleCall_finish_turn {
    __kind: 'finish_turn'
}

/**
 * See [`Pallet::force_finish_turn`].
 */
export interface HexalemModuleCall_force_finish_turn {
    __kind: 'force_finish_turn'
    gameId: Bytes
}

/**
 * See [`Pallet::play`].
 */
export interface HexalemModuleCall_play {
    __kind: 'play'
    movePlayed: Move
}

/**
 * See [`Pallet::receive_reward`].
 */
export interface HexalemModuleCall_receive_reward {
    __kind: 'receive_reward'
}

/**
 * See [`Pallet::root_delete_game`].
 */
export interface HexalemModuleCall_root_delete_game {
    __kind: 'root_delete_game'
    gameId: Bytes
}

/**
 * See [`Pallet::upgrade`].
 */
export interface HexalemModuleCall_upgrade {
    __kind: 'upgrade'
    placeIndex: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
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
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type DmpQueueCall = DmpQueueCall_service_overweight

/**
 * See [`Pallet::service_overweight`].
 */
export interface DmpQueueCall_service_overweight {
    __kind: 'service_overweight'
    index: bigint
    weightLimit: Weight
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
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
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type BalancesCall = BalancesCall_force_set_balance | BalancesCall_force_transfer | BalancesCall_force_unreserve | BalancesCall_transfer_all | BalancesCall_transfer_allow_death | BalancesCall_transfer_keep_alive | BalancesCall_upgrade_accounts

/**
 * See [`Pallet::force_set_balance`].
 */
export interface BalancesCall_force_set_balance {
    __kind: 'force_set_balance'
    who: MultiAddress
    newFree: bigint
}

/**
 * See [`Pallet::force_transfer`].
 */
export interface BalancesCall_force_transfer {
    __kind: 'force_transfer'
    source: MultiAddress
    dest: MultiAddress
    value: bigint
}

/**
 * See [`Pallet::force_unreserve`].
 */
export interface BalancesCall_force_unreserve {
    __kind: 'force_unreserve'
    who: MultiAddress
    amount: bigint
}

/**
 * See [`Pallet::transfer_all`].
 */
export interface BalancesCall_transfer_all {
    __kind: 'transfer_all'
    dest: MultiAddress
    keepAlive: boolean
}

/**
 * See [`Pallet::transfer_allow_death`].
 */
export interface BalancesCall_transfer_allow_death {
    __kind: 'transfer_allow_death'
    dest: MultiAddress
    value: bigint
}

/**
 * See [`Pallet::transfer_keep_alive`].
 */
export interface BalancesCall_transfer_keep_alive {
    __kind: 'transfer_keep_alive'
    dest: MultiAddress
    value: bigint
}

/**
 * See [`Pallet::upgrade_accounts`].
 */
export interface BalancesCall_upgrade_accounts {
    __kind: 'upgrade_accounts'
    who: AccountId32[]
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
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
        name: sts.bytes(),
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

export interface Season {
    name: Bytes
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
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type AwesomeAvatarsCall = AwesomeAvatarsCall_buy | AwesomeAvatarsCall_claim_treasury | AwesomeAvatarsCall_forge | AwesomeAvatarsCall_lock_avatar | AwesomeAvatarsCall_mint | AwesomeAvatarsCall_prepare_avatar | AwesomeAvatarsCall_prepare_ipfs | AwesomeAvatarsCall_remove_price | AwesomeAvatarsCall_set_collection_id | AwesomeAvatarsCall_set_free_mints | AwesomeAvatarsCall_set_organizer | AwesomeAvatarsCall_set_price | AwesomeAvatarsCall_set_season | AwesomeAvatarsCall_set_service_account | AwesomeAvatarsCall_set_treasurer | AwesomeAvatarsCall_transfer_avatar | AwesomeAvatarsCall_transfer_free_mints | AwesomeAvatarsCall_unlock_avatar | AwesomeAvatarsCall_unprepare_avatar | AwesomeAvatarsCall_update_global_config | AwesomeAvatarsCall_upgrade_storage

/**
 * See [`Pallet::buy`].
 */
export interface AwesomeAvatarsCall_buy {
    __kind: 'buy'
    avatarId: H256
}

/**
 * See [`Pallet::claim_treasury`].
 */
export interface AwesomeAvatarsCall_claim_treasury {
    __kind: 'claim_treasury'
    seasonId: number
}

/**
 * See [`Pallet::forge`].
 */
export interface AwesomeAvatarsCall_forge {
    __kind: 'forge'
    leader: H256
    sacrifices: H256[]
}

/**
 * See [`Pallet::lock_avatar`].
 */
export interface AwesomeAvatarsCall_lock_avatar {
    __kind: 'lock_avatar'
    avatarId: H256
}

/**
 * See [`Pallet::mint`].
 */
export interface AwesomeAvatarsCall_mint {
    __kind: 'mint'
    mintOption: MintOption
}

/**
 * See [`Pallet::prepare_avatar`].
 */
export interface AwesomeAvatarsCall_prepare_avatar {
    __kind: 'prepare_avatar'
    avatarId: H256
}

/**
 * See [`Pallet::prepare_ipfs`].
 */
export interface AwesomeAvatarsCall_prepare_ipfs {
    __kind: 'prepare_ipfs'
    avatarId: H256
    url: Bytes
}

/**
 * See [`Pallet::remove_price`].
 */
export interface AwesomeAvatarsCall_remove_price {
    __kind: 'remove_price'
    avatarId: H256
}

/**
 * See [`Pallet::set_collection_id`].
 */
export interface AwesomeAvatarsCall_set_collection_id {
    __kind: 'set_collection_id'
    collectionId: number
}

/**
 * See [`Pallet::set_free_mints`].
 */
export interface AwesomeAvatarsCall_set_free_mints {
    __kind: 'set_free_mints'
    target: AccountId32
    howMany: number
}

/**
 * See [`Pallet::set_organizer`].
 */
export interface AwesomeAvatarsCall_set_organizer {
    __kind: 'set_organizer'
    organizer: AccountId32
}

/**
 * See [`Pallet::set_price`].
 */
export interface AwesomeAvatarsCall_set_price {
    __kind: 'set_price'
    avatarId: H256
    price: bigint
}

/**
 * See [`Pallet::set_season`].
 */
export interface AwesomeAvatarsCall_set_season {
    __kind: 'set_season'
    seasonId: number
    season: Season
}

/**
 * See [`Pallet::set_service_account`].
 */
export interface AwesomeAvatarsCall_set_service_account {
    __kind: 'set_service_account'
    serviceAccount: AccountId32
}

/**
 * See [`Pallet::set_treasurer`].
 */
export interface AwesomeAvatarsCall_set_treasurer {
    __kind: 'set_treasurer'
    seasonId: number
    treasurer: AccountId32
}

/**
 * See [`Pallet::transfer_avatar`].
 */
export interface AwesomeAvatarsCall_transfer_avatar {
    __kind: 'transfer_avatar'
    to: AccountId32
    avatarId: H256
}

/**
 * See [`Pallet::transfer_free_mints`].
 */
export interface AwesomeAvatarsCall_transfer_free_mints {
    __kind: 'transfer_free_mints'
    to: AccountId32
    howMany: number
}

/**
 * See [`Pallet::unlock_avatar`].
 */
export interface AwesomeAvatarsCall_unlock_avatar {
    __kind: 'unlock_avatar'
    avatarId: H256
}

/**
 * See [`Pallet::unprepare_avatar`].
 */
export interface AwesomeAvatarsCall_unprepare_avatar {
    __kind: 'unprepare_avatar'
    avatarId: H256
}

/**
 * See [`Pallet::update_global_config`].
 */
export interface AwesomeAvatarsCall_update_global_config {
    __kind: 'update_global_config'
    newGlobalConfig: GlobalConfig
}

/**
 * See [`Pallet::upgrade_storage`].
 */
export interface AwesomeAvatarsCall_upgrade_storage {
    __kind: 'upgrade_storage'
    beneficiary?: (AccountId32 | undefined)
    inSeason?: (number | undefined)
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
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
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type AuthoritiesNotingCall = AuthoritiesNotingCall_set_authorities | AuthoritiesNotingCall_set_latest_authorities_data | AuthoritiesNotingCall_set_orchestrator_para_id

/**
 * See [`Pallet::set_authorities`].
 */
export interface AuthoritiesNotingCall_set_authorities {
    __kind: 'set_authorities'
    authorities: Public[]
}

/**
 * See [`Pallet::set_latest_authorities_data`].
 */
export interface AuthoritiesNotingCall_set_latest_authorities_data {
    __kind: 'set_latest_authorities_data'
    data: ContainerChainAuthoritiesInherentData
}

/**
 * See [`Pallet::set_orchestrator_para_id`].
 */
export interface AuthoritiesNotingCall_set_orchestrator_para_id {
    __kind: 'set_orchestrator_para_id'
    newParaId: Id
}

export type Public = Bytes

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const AuthorInherentCall: sts.Type<AuthorInherentCall> = sts.closedEnum(() => {
    return  {
        kick_off_authorship_validation: sts.unit(),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type AuthorInherentCall = AuthorInherentCall_kick_off_authorship_validation

/**
 * See [`Pallet::kick_off_authorship_validation`].
 */
export interface AuthorInherentCall_kick_off_authorship_validation {
    __kind: 'kick_off_authorship_validation'
}

export type Call = Call_AuthorInherent | Call_AuthoritiesNoting | Call_AwesomeAvatars | Call_Balances | Call_DmpQueue | Call_HexalemModule | Call_MaintenanceMode | Call_Nft | Call_ParachainInfo | Call_ParachainSystem | Call_PolkadotXcm | Call_Proxy | Call_RootTesting | Call_Sudo | Call_System | Call_Timestamp | Call_TxPause | Call_Utility

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

export interface Call_HexalemModule {
    __kind: 'HexalemModule'
    value: HexalemModuleCall
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

export interface Call_RootTesting {
    __kind: 'RootTesting'
    value: RootTestingCall
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

export interface Call_TxPause {
    __kind: 'TxPause'
    value: TxPauseCall
}

export interface Call_Utility {
    __kind: 'Utility'
    value: UtilityCall
}
