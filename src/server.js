require('dotenv').config();

const
  express = require('express'),
  app = express();

app.get('/', (req, res) => {
  res.send('Welcome to ilemauricebooking-service.');
});

const port = process.env.PORT || 4001;

app.listen(port, () => console.log(`Listening on port ${port}!`));