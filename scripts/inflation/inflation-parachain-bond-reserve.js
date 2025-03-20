import fs from "fs";
import { ethers } from "ethers";
import {
  args,
  fetchData,
  getMonthlyTimeRange,
  START_TIMESTAMPS,
  PORTS,
} from "../common/index.js";
import { stringify } from "csv-stringify";

const main = async () => {
  //const port = PORTS[args.network];
  const port = 4350;
  const startTimestamp = args.startDate
    ? new Date(args.startDate).getTime()
    : START_TIMESTAMPS[args.network];
  const endTimestamp = args.endDate
    ? new Date(args.endDate).getTime() + 86399999
    : new Date().getTime();

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
      await getDailyData(
        port,
        startTimestamp,
        endTimestamp,
        args.network,
        args.network
      );
      break;
    case "monthly":
      await getMonthlyData(port, startTimestamp, endTimestamp, args.network);
      break;
    case "total":
      await getTotalData(port, startTimestamp, endTimestamp, args.network);
      break;
    default:
      break;
  }
};

const createQuery = (start, end) => {
  return `query {
        parachainBondTransfers(where: {timestamp_gte: ${start}, AND: {timestamp_lt: ${end}}}) {
            id
            balance
            destination
            destinationAddress
          }
    }`;
};

const writeToCsv = (data, interval, network) => {
  let columns = { 
    date: "date", 
    totalAmount: "totalAmount", 
    treasuryAmount: "treasuryAmount", 
    parachainBondAmount: "parachainBondAmount" 
  };
  
  if (interval === "total") {
    columns = { 
      totalAmount: "totalAmount", 
      treasuryAmount: "treasuryAmount", 
      parachainBondAmount: "parachainBondAmount" 
    };
  }

  const filePath = `csv-files/${network}-${interval}-parachain-bond-reserve.csv`;

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
    let totalAmount = 0n;
    let treasuryAmount = 0n;
    let parachainBondAmount = 0n;

    const query = createQuery(currDay, currDay + msDay);
    const res = await fetchData(port, query);

    for (let transfer of res.parachainBondTransfers) {
      const amount = BigInt(transfer.balance);
      totalAmount += amount;
      
      if (transfer.destination === "treasury") {
        treasuryAmount += amount;
      } else if (transfer.destination === "parachainBond") {
        parachainBondAmount += amount;
      }
    }

    // convert timestamps to readable dates
    const readableDate = new Date(currDay).toISOString().split("T")[0];
    // convert balance to ether
    const totalAmountInEth = ethers.utils.formatEther(totalAmount);
    const treasuryAmountInEth = ethers.utils.formatEther(treasuryAmount);
    const parachainBondAmountInEth = ethers.utils.formatEther(parachainBondAmount);
    
    csvRows.push({
      date: readableDate, 
      totalAmount: totalAmountInEth, 
      treasuryAmount: treasuryAmountInEth, 
      parachainBondAmount: parachainBondAmountInEth
    });

    currDay += msDay;
  }

  writeToCsv(csvRows, "daily", network);
};

const getMonthlyData = async (port, start, end, network) => {
  let startTimestamp = start;

  const csvRows = [];

  while (startTimestamp < end) {
    const timeRange = getMonthlyTimeRange(startTimestamp, end);

    let totalAmount = 0n;
    let treasuryAmount = 0n;
    let parachainBondAmount = 0n;

    const query = createQuery(timeRange.start, timeRange.end);
    const res = await fetchData(port, query);

    for (let transfer of res.parachainBondTransfers) {
      const amount = BigInt(transfer.balance);
      totalAmount += amount;
      
      if (transfer.destination === "treasury") {
        treasuryAmount += amount;
      } else if (transfer.destination === "parachainBond") {
        parachainBondAmount += amount;
      }
    }

    // convert timestamps to readable dates
    const readableDate = new Date(startTimestamp).toISOString().split("T")[0];
    // convert balance to ether
    const totalAmountInEth = ethers.utils.formatEther(totalAmount);
    const treasuryAmountInEth = ethers.utils.formatEther(treasuryAmount);
    const parachainBondAmountInEth = ethers.utils.formatEther(parachainBondAmount);
    
    csvRows.push({
      date: readableDate, 
      totalAmount: totalAmountInEth, 
      treasuryAmount: treasuryAmountInEth, 
      parachainBondAmount: parachainBondAmountInEth
    });

    startTimestamp = timeRange.end + 1;
  }

  writeToCsv(csvRows, "monthly", network);
};

const getTotalData = async (port, start, end, network) => {
  let startTimestamp = start;
  let totalAmount = 0n;
  let treasuryAmount = 0n;
  let parachainBondAmount = 0n;

  while (startTimestamp < end) {
    const timeRange = getMonthlyTimeRange(startTimestamp, end);

    const query = createQuery(timeRange.start, timeRange.end);
    const res = await fetchData(port, query);

    for (let transfer of res.parachainBondTransfers) {
      const amount = BigInt(transfer.balance);
      totalAmount += amount;
      
      if (transfer.destination === "treasury") {
        treasuryAmount += amount;
      } else if (transfer.destination === "parachainBond") {
        parachainBondAmount += amount;
      }
    }

    startTimestamp = timeRange.end + 1;
  }

  const totalAmountInEth = ethers.utils.formatEther(totalAmount);
  const treasuryAmountInEth = ethers.utils.formatEther(treasuryAmount);
  const parachainBondAmountInEth = ethers.utils.formatEther(parachainBondAmount);
  
  writeToCsv([{ 
    totalAmount: totalAmountInEth, 
    treasuryAmount: treasuryAmountInEth, 
    parachainBondAmount: parachainBondAmountInEth 
  }], "total", network);
};

main();