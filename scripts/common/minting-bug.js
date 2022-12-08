export const getMintingBugAmount = (month, network) => {
  if (network === "moonbeam") {
    if (month === "2022-1") {
      return 296.95;
    } else if (month === "2022-2") {
      return 5824.93;
    } else if (month === "2022-3") {
      return 10120.29;
    } else if (month === "2022-4") {
      return 13995.99;
    } else if (month === "2022-5") {
      return 13440.47;
    } else if (month === "2022-6") {
      return 7527.21;
    } else {
      return 0;
    }
  } else if (network === "moonriver") {
    if (month === "2022-2") {
      return 296.95;
    } else if (month === "2022-3") {
      return 589.86;
    } else if (month === "2022-4") {
      return 553.94;
    } else if (month === "2022-5") {
      return 600.62;
    } else if (month === "2022-6") {
      return 571.74;
    } else {
      return 0;
    }
  }
};
