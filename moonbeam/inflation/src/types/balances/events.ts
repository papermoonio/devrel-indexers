import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v900 from '../v900'
import * as v1001 from '../v1001'
import * as v1201 from '../v1201'

export const transfer =  {
    name: 'Balances.Transfer',
    /**
     * Transfer succeeded. \[from, to, value\]
     */
    v900: new EventType(
        'Balances.Transfer',
        sts.tuple([v900.H160, v900.H160, sts.bigint()])
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
     * Some amount was deposited (e.g. for transaction fees). \[who, deposit\]
     */
    v900: new EventType(
        'Balances.Deposit',
        sts.tuple([v900.H160, sts.bigint()])
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
