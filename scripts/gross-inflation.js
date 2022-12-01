import axios from "axios";
import fs from "fs";
import yargs from "yargs/yargs";
import { ethers } from "ethers";
import { stringify } from "csv-stringify";

// set up yargs
const args = yargs(process.argv.slice(2))
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

const startTimestamps = {
  moonbeam: 1639785600000, //1639798583000,
  moonriver: 1624924800000, //1624966085000
};

const main = async () => {
  const port = args.network === "moonbeam" ? 4350 : 4351;
  const startTimestamp = new Date(args.startDate).getTime();
  const endTimestamp = new Date(args.endDate).getTime() + 86399999; // get the end of the day

  if (startTimestamp > endTimestamp) {
    throw new Error("The start date must be before the end date");
  }

  if (args.network != "moonbeam" && args.network != "moonriver") {
    throw new Error("The network must be moonbeam or moonriver");
  }

  console.log(
    `🐶 Fetching ${args.interval} data. This could take a few minutes...`
  );

  switch (args.interval) {
    case "daily":
      await getDailyData(port, startTimestamp, endTimestamp, args.network);
      break;
    case "monthly":
      await getMonthlyData(port, startTimestamp, endTimestamp, args.network);
      break;
    case "total":
      const start =
        args.network === "moonbeam"
          ? startTimestamps.moonbeam
          : startTimestamps.moonriver;
      await getTotalData(port, start, args.network);
      break;
    default:
      break;
  }
};

const fetchData = async (port, query) => {
  const req = await axios({
    url: `http://localhost:${port}/graphql`,
    method: "post",
    data: { query },
  });

  return req.data.data;
};

const createQuery = (start, end) => {
  return `query {
          parachainBondTransfers(where: {timestamp_gte: ${start}, AND: {timestamp_lt: ${end}}}) {
            id
            balance
          }
          stakingRewards(where: {timestamp_gte: ${start}, AND: {timestamp_lt: ${end}}}) {
            id
            balance
          }
      }`;
};

const writeToCsv = (data, interval, network) => {
  let columns = { date: "date", amount: "amount" };
  if (interval === "total") {
    columns = { amount: "amount" };
  }

  const filePath = `csv-files/${network}-${interval}-gross-inflation.csv`;

  stringify(data, { header: true, columns }, (e, output) => {
    if (e) throw e;
    fs.writeFile(`${process.cwd()}/${filePath}`, output, "utf8", (e) => {
      if (e) throw e;
    });
  });

  console.log(
    `✅ Request completed. You can find the output in the following directory: ${filePath}`
  );
};

const getDailyData = async (port, start, end, network) => {
  const msDay = 86400000;
  let currDay = start;

  const csvRows = [];

  while (currDay < end) {
    const query = createQuery(currDay, currDay + msDay);
    const data = await fetchData(port, query);

    let parachainBondTransfersAmount = 0n;
    let stakingRewardsAmount = 0n;

    for (let transfer of data.parachainBondTransfers) {
      parachainBondTransfersAmount += BigInt(transfer.balance);
    }

    for (let reward of data.stakingRewards) {
      stakingRewardsAmount += BigInt(reward.balance);
    }

    const grossInflation = parachainBondTransfersAmount + stakingRewardsAmount;

    // convert timestamps to readable dates
    const readableDate = new Date(currDay).toISOString().split("T")[0];
    // convert balance to ether
    const amountInEth = ethers.utils.formatEther(grossInflation);
    csvRows.push([readableDate, amountInEth]);

    currDay += msDay;
  }

  writeToCsv(csvRows, "daily", network);
};

const getDaysInMonth = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;

  return new Date(year, month, 0).getUTCDate();
};

const getMonthlyTimeRange = (start, end) => {
  // convert timestamps to year-month format
  const startDate = new Date(start);
  const endDate = new Date(end);

  // if the start month is the same as end month, use start & end timestamps as is
  const startYearMonth = `${startDate.getFullYear()}-${
    startDate.getUTCMonth() + 1
  }`;
  const endYearMonth = `${endDate.getFullYear()}-${endDate.getUTCMonth() + 1}`;
  if (startYearMonth === endYearMonth) {
    return {
      start,
      end,
    };
  }

  const daysInMonth = getDaysInMonth(start);
  let daysNeeded = daysInMonth;

  // if the months are different & the start day is not the first day of the month, get remaining days
  const startDayOfMonth = startDate.getUTCDate();
  if (startDayOfMonth !== 1) {
    daysNeeded = daysInMonth - startDayOfMonth + 1;
  }

  return {
    start,
    end: daysNeeded * 86400000 + start,
  };
};

const getMonthlyData = async (port, start, end, network) => {
  let startTimestamp = start;

  const csvRows = [];

  while (startTimestamp < end) {
    const timeRange = getMonthlyTimeRange(startTimestamp, end);

    const query = createQuery(timeRange.start, timeRange.end);
    const data = await fetchData(port, query);

    let parachainBondTransfersAmount = 0n;
    let stakingRewardsAmount = 0n;

    for (let transfer of data.parachainBondTransfers) {
      parachainBondTransfersAmount += BigInt(transfer.balance);
    }

    for (let reward of data.stakingRewards) {
      stakingRewardsAmount += BigInt(reward.balance);
    }

    const grossInflation = parachainBondTransfersAmount + stakingRewardsAmount;

    // convert timestamps to readable dates
    const readableDate = new Date(startTimestamp).toISOString().split("T")[0];
    // convert balance to ether
    const amountInEth = ethers.utils.formatEther(grossInflation);
    csvRows.push([readableDate, amountInEth]);

    startTimestamp = timeRange.end + 1;
  }

  writeToCsv(csvRows, "monthly", network);
};

const getTotalData = async (port, start, network) => {
  // get the current date as the end date
  const end = new Date().getTime();
  let startTimestamp = start;

  let parachainBondTransfersAmount = 0n;
  let stakingRewardsAmount = 0n;

  while (startTimestamp < end) {
    const timeRange = getMonthlyTimeRange(startTimestamp, end);

    const query = createQuery(timeRange.start, timeRange.end);
    const data = await fetchData(port, query);

    for (let transfer of data.parachainBondTransfers) {
      parachainBondTransfersAmount += BigInt(transfer.balance);
    }

    for (let reward of data.stakingRewards) {
      stakingRewardsAmount += BigInt(reward.balance);
    }

    startTimestamp = timeRange.end + 1;
  }

  const grossInflation = parachainBondTransfersAmount + stakingRewardsAmount;

  const amountInEth = ethers.utils.formatEther(grossInflation);
  writeToCsv([[amountInEth]], "total", network);
};

main();
