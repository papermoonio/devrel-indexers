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
  const startYearMonth = `${startDate.getUTCFullYear()}-${
    startDate.getUTCMonth() + 1
  }`;
  const endYearMonth = `${endDate.getUTCFullYear()}-${
    endDate.getUTCMonth() + 1
  }`;
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
    readableStart: startYearMonth,
  };
};

export { getMonthlyTimeRange };
