require('dotenv').config();

const
  express = require('express'),
  app = express();

app.get('/', (req, res) => {
  res.send('Welcome to ilemauricebooking-service. My name is ' + process.env.NAME);
});

app.listen(3000, () => console.log('Listening on port 3000! My name is ' + process.env.NAME));