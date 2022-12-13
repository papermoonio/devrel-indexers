import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
  SubstrateCall,
  toHex,
} from "@subsquid/substrate-processor";
import { lookupArchive } from "@subsquid/archive-registry";
import { ContractAddress, Address } from "./model";
import { SystemNewAccountEvent } from "./types/events";

const processor = new SubstrateBatchProcessor()
  .setBatchSize(500)
  .setDataSource({
    archive: lookupArchive("moonbeam", { release: "FireSquid" }),
  })
  .addCall("Ethereum.transact")
  .addEvent("System.NewAccount");

processor.setBlockRange({ from: 168104 });

processor.run(new TypeormDatabase(), async (ctx) => {
  const contractAddresses = await getcontractAddresses(ctx);
  const addresses = await getAddresses(ctx);
  await ctx.store.insert(contractAddresses);
  await ctx.store.insert(addresses);
});

type Item = BatchProcessorItem<typeof processor>;
type Ctx = BatchContext<Store, Item>;

async function getcontractAddresses(ctx: Ctx): Promise<ContractAddress[]> {
  const contractAddresses: ContractAddress[] = [];
  for (const block of ctx.blocks) {
    for (const item of block.items) {
      if (item.kind === "call" && item.name === "Ethereum.transact") {
        const call = item.call as SubstrateCall;
        let action: string = "";

        if (call.args.transaction.action) {
          action = call.args.transaction.action.__kind;
        } else {
          action = call.args.transaction.value.action.__kind;
        }

        if (action && action == "Create") {
          let contractAddress = new ContractAddress();
          contractAddress.id = item.call.id;
          contractAddress.timestamp = BigInt(block.header.timestamp);
          contractAddress.blockNo = BigInt(block.header.height);

          contractAddresses.push(contractAddress);
        }
      }
    }
  }
  return contractAddresses;
}

async function getAddresses(ctx: Ctx): Promise<Address[]> {
  const addresses: Address[] = [];
  for (const block of ctx.blocks) {
    for (const item of block.items) {
      if (item.name === "System.NewAccount") {
        const event = new SystemNewAccountEvent(ctx, item.event);
        let address = new Address();

        address.id = item.event.id;
        address.timestamp = BigInt(block.header.timestamp);
        address.blockNo = BigInt(block.header.height);

        if (event.isV900) {
          address.accountId = toHex(event.asV900);
        } else if (event.isV1300) {
          address.accountId = toHex(event.asV1300.account);
        }
        addresses.push(address);
      }
    }
  }
  return addresses;
}
