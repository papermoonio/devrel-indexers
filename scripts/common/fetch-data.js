import axios from "axios";

export const fetchData = async (port, query) => {
  const req = await axios({
    url: `http://localhost:${port}/graphql`,
    method: "post",
    data: { query },
  });

  return req.data.data;
};
