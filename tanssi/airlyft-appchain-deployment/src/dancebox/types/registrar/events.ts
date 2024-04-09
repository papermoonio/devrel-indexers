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
