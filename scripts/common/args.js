import yargs from "yargs/yargs";

// set up yargs
export const args = yargs(process.argv.slice(2))
  .usage("Usage: $0 <command> option")
  .alias("i", "interval")
  .alias("n", "network")
  .alias("s", "startDate")
  .alias("e", "endDate")
  .describe("i", "Interval to group data by (daily, monthly, total)")
  .describe("n", "Network (moonbeam, moonriver)")
  .describe("s", "Start date for the data (i.e., 2022-01-01)")
  .describe("e", "End date for the data (i.e., 2022-12-31)")
  .example("$0 -i daily -n moonbeam -s 2022-01-01 -e 2022-12-31")
  .demandOption(["i", "n"]).argv;
