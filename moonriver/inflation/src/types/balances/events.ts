import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v49 from '../v49'
import * as v1001 from '../v1001'
import * as v1201 from '../v1201'

export const transfer =  {
    name: 'Balances.Transfer',
    /**
     *  Transfer succeeded. \[from, to, value\]
     */
    v49: new EventType(
        'Balances.Transfer',
        sts.tuple([v49.AccountId, v49.AccountId, v49.Balance])
    ),
    /**
     * Transfer succeeded.
     */
    v1201: new EventType(
        'Balances.Transfer',
        sts.struct({
            from: v1201.AccountId20,
            to: v1201.AccountId20,
            amount: sts.bigint(),
        })
    ),
}

export const deposit =  {
    name: 'Balances.Deposit',
    /**
     *  Some amount was deposited (e.g. for transaction fees). \[who, deposit\]
     */
    v49: new EventType(
        'Balances.Deposit',
        sts.tuple([v49.AccountId, v49.Balance])
    ),
    /**
     * Some amount was deposited (e.g. for transaction fees).
     */
    v1201: new EventType(
        'Balances.Deposit',
        sts.struct({
            who: v1201.AccountId20,
            amount: sts.bigint(),
        })
    ),
}

export const withdraw =  {
    name: 'Balances.Withdraw',
    /**
     * Some amount was withdrawn from the account (e.g. for transaction fees). \[who, value\]
     */
    v1001: new EventType(
        'Balances.Withdraw',
        sts.tuple([v1001.AccountId20, sts.bigint()])
    ),
    /**
     * Some amount was withdrawn from the account (e.g. for transaction fees).
     */
    v1201: new EventType(
        'Balances.Withdraw',
        sts.struct({
            who: v1201.AccountId20,
            amount: sts.bigint(),
        })
    ),
}
