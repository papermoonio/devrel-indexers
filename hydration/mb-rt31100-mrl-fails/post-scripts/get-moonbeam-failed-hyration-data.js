const axios = require('axios');
const fs = require('fs');

const graphqlEndpoint = 'http://localhost:4350/graphql'; // Update with your GraphQL endpoint

const query = `
query MyQuery {
  xcms {
    amount
    asset
    assetIDHDX
    assetName
    dest
    hash
    id
    sender
  }
}
`;

axios
  .post(
    graphqlEndpoint,
    { query },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  .then((response) => {
    const xcms = response.data.data.xcms;

    const jsonData = JSON.stringify(xcms);

    const filePath = 'output.json';

    fs.writeFileSync(filePath, jsonData);

    console.log(`JSON array has been stored in ${filePath}`);
  })
  .catch((error) => {
    console.error('GraphQL Error:', error);
  });
