import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v101 from '../v101'

export const paraIdRegistered =  {
    name: 'Registrar.ParaIdRegistered',
    /**
     * A new para id has been registered. [para_id]
     */
    v101: new EventType(
        'Registrar.ParaIdRegistered',
        sts.struct({
            paraId: v101.Id,
        })
    ),
}

export const paraIdDeregistered =  {
    name: 'Registrar.ParaIdDeregistered',
    /**
     * A para id has been deregistered. [para_id]
     */
    v101: new EventType(
        'Registrar.ParaIdDeregistered',
        sts.struct({
            paraId: v101.Id,
        })
    ),
}

export const paraIdValidForCollating =  {
    name: 'Registrar.ParaIdValidForCollating',
    /**
     * A new para id is now valid for collating. [para_id]
     */
    v101: new EventType(
        'Registrar.ParaIdValidForCollating',
        sts.struct({
            paraId: v101.Id,
        })
    ),
}
