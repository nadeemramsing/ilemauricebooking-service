require('dotenv').config();

const express = require('express');
const stitchDB = require('./stitch-db');
const app = express();

main();

app.get('/', (req, res) => {
  res.send('Welcome to ilemauricebooking-service.');
});

const port = process.env.PORT || 4001;

app.listen(port, () => console.log(`Listening on port ${port}!`));

// MAIN
async function main() {
  const connection = await stitchDB.connect()
  stitchDB.test();
}