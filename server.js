require('dotenv').config();

const
  express = require('express'),
  app = express();

app.get('/', (req, res) => {
  res.send('Welcome to ilemauricebooking-service.');
});

app.listen(3000, () => console.log('Listening on port 3000!'));