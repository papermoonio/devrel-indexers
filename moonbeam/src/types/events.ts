import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'

export class ParachainStakingReservedForParachainBondEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'ParachainStaking.ReservedForParachainBond')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Transferred to account which holds funds reserved for parachain bond
   */
  get isV900(): boolean {
    return this._chain.getEventHash('ParachainStaking.ReservedForParachainBond') === 'e4f02aa7cee015102b6cbc171f5d7e84370e60deba2166a27195187adde0407f'
  }

  /**
   * Transferred to account which holds funds reserved for parachain bond
   */
  get asV900(): [Uint8Array, bigint] {
    assert(this.isV900)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Transferred to account which holds funds reserved for parachain bond.
   */
  get isV1300(): boolean {
    return this._chain.getEventHash('ParachainStaking.ReservedForParachainBond') === 'f78c82b8762f1309d2fbca1935e04e3419179c059d2e42e6f63bc6e99387beae'
  }

  /**
   * Transferred to account which holds funds reserved for parachain bond.
   */
  get asV1300(): {account: Uint8Array, value: bigint} {
    assert(this.isV1300)
    return this._chain.decodeEvent(this.event)
  }
}

export class ParachainStakingRewardedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'ParachainStaking.Rewarded')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Paid the account (nominator or collator) the balance as liquid rewards
   */
  get isV900(): boolean {
    return this._chain.getEventHash('ParachainStaking.Rewarded') === 'e4f02aa7cee015102b6cbc171f5d7e84370e60deba2166a27195187adde0407f'
  }

  /**
   * Paid the account (nominator or collator) the balance as liquid rewards
   */
  get asV900(): [Uint8Array, bigint] {
    assert(this.isV900)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Paid the account (delegator or collator) the balance as liquid rewards.
   */
  get isV1300(): boolean {
    return this._chain.getEventHash('ParachainStaking.Rewarded') === '44a7364018ebad92746e4ca7c7c23d24d5da43cda2e63a90c665b522994ef1e2'
  }

  /**
   * Paid the account (delegator or collator) the balance as liquid rewards.
   */
  get asV1300(): {account: Uint8Array, rewards: bigint} {
    assert(this.isV1300)
    return this._chain.decodeEvent(this.event)
  }
}

export class TreasuryDepositEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Treasury.Deposit')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Some funds have been deposited. \[deposit\]
   */
  get isV900(): boolean {
    return this._chain.getEventHash('Treasury.Deposit') === '47b59f698451e50cce59979f0121e842fa3f8b2bcef2e388222dbd69849514f9'
  }

  /**
   * Some funds have been deposited. \[deposit\]
   */
  get asV900(): bigint {
    assert(this.isV900)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Some funds have been deposited.
   */
  get isV1300(): boolean {
    return this._chain.getEventHash('Treasury.Deposit') === 'd74027ad27459f17d7446fef449271d1b0dc12b852c175623e871d009a661493'
  }

  /**
   * Some funds have been deposited.
   */
  get asV1300(): {value: bigint} {
    assert(this.isV1300)
    return this._chain.decodeEvent(this.event)
  }
}
