import { TypeormDatabase } from '@subsquid/typeorm-store';
import { processor } from './processor';
import { RelayRegistration, Chain } from '../model';
import * as ss58 from '@subsquid/ss58'
import { In } from 'typeorm';

type Tuple<T, K> = [T, K];

processor.run(new TypeormDatabase({
  stateSchema: 'relay-processor',
}), async (ctx) => {
    // Tuple<RelayRegistration, and the parachain ID>
    const registrations: Tuple<RelayRegistration, string>[] = [];

  // Use a map so we don't have to worry about duplicates
  const paraIds = new Set<string>();

  for (const block of ctx.blocks) {
    for (let call of block.calls) {
      if (call.name === "Registrar.register") {
        const { args, origin, success } = call;
        const paraId = `${args.id}`

        if (success) {
          registrations.push([new RelayRegistration({
            id: call.id,
            blockNo: block.header.height,
            timestamp: `${block.header.timestamp}`,
            sender: ss58.codec('substrate').encode(origin.value.value)
          }), paraId])

          paraIds.add(paraId);
        }
      }
    }
  }

  // Get the chains from the database if they exist
  let chains = await ctx.store.findBy(Chain, { id: In([...paraIds]) })
  .then((chains) => new Map(chains.map((c) => [c.id, c])));

  for (const paraId of paraIds) {
    // If the parachain doesn't exist in the database, add it
    if (!chains.has(paraId)) {
      const newChain = new Chain({
        id: paraId
      })
      chains.set(paraId, newChain);
    }
  }

  for (const registration of registrations) {
    // Get the parachain ID from the Chain table
    const paraId = chains.get(registration[1]) as Chain;

    // Make the connection between the chain and the registration
    registration[0].paraId = paraId;
  }

  await ctx.store.save([...chains.values()]);
  await ctx.store.insert(registrations.map((el) => el[0]));
});
