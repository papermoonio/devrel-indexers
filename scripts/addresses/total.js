import fs from "fs";
import {
  args,
  fetchData,
  getMonthlyTimeRange,
  START_TIMESTAMPS,
  PORTS,
} from "../common/index.js";
import { stringify } from "csv-stringify";

const main = async () => {
  const port = PORTS[args.network];
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
        addresses(where: {timestamp_gte: ${start}, AND: {timestamp_lt: ${end}}}) {
            id
          }
    }`;
};

const writeToCsv = (data, interval, network) => {
  let columns = { date: "date", amount: "count" };
  if (interval === "total") {
    columns = { count: "count" };
  }

  const filePath = `csv-files/${network}-${interval}-total-addresses.csv`;

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
    const res = await fetchData(port, query);

    const dailyTotal = res.addresses.length;

    // convert timestamps to readable dates
    const readableDate = new Date(currDay).toISOString().split("T")[0];
    csvRows.push([readableDate, dailyTotal]);

    currDay += msDay;
  }

  writeToCsv(csvRows, "daily", network);
};

const getMonthlyData = async (port, start, end, network) => {
  let startTimestamp = start;

  const csvRows = [];

  while (startTimestamp < end) {
    const timeRange = getMonthlyTimeRange(startTimestamp, end);
    const query = createQuery(timeRange.start, timeRange.end);
    const res = await fetchData(port, query);

    const monthlyTotal = res.addresses.length;

    // convert timestamps to readable dates
    const readableDate = new Date(startTimestamp).toISOString().split("T")[0];
    csvRows.push([readableDate, monthlyTotal]);

    startTimestamp = timeRange.end + 1;
  }

  writeToCsv(csvRows, "monthly", network);
};

const getTotalData = async (port, start, end, network) => {
  let startTimestamp = start;
  let total = 0;

  while (startTimestamp < end) {
    const timeRange = getMonthlyTimeRange(startTimestamp, end);

    const query = createQuery(timeRange.start, timeRange.end);
    const res = await fetchData(port, query);

    total += res.addresses.length;

    startTimestamp = timeRange.end + 1;
  }

  writeToCsv([[total]], "total", network);
};

main();
