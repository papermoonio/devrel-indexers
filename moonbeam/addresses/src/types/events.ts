import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'

export class SystemNewAccountEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'System.NewAccount')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A new \[account\] was created.
   */
  get isV900(): boolean {
    return this._chain.getEventHash('System.NewAccount') === '15bab564ac60f719121cf1b5dee312d333f0648b54550beefdf79deda6264096'
  }

  /**
   * A new \[account\] was created.
   */
  get asV900(): Uint8Array {
    assert(this.isV900)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A new account was created.
   */
  get isV1300(): boolean {
    return this._chain.getEventHash('System.NewAccount') === '041e3c99c7373645533b0a38437f03393c46e1c811b17689bc2c51c0b6784c09'
  }

  /**
   * A new account was created.
   */
  get asV1300(): {account: Uint8Array} {
    assert(this.isV1300)
    return this._chain.decodeEvent(this.event)
  }
}
