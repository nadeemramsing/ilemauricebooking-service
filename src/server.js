require('dotenv').config();

const
  express = require('express'),
  db = require('./mongodb-stitch-db'),

  app = express();

db
  .connect()
  .then(async connection => {
    const propertiesCollection = connection.db.collection('properties');

    const insertedProperty = await propertiesCollection
      .insertOne({
        name: 'Nadeem Ramsing',
        owner_id: connection.ownerId
      })
      .catch(err => console.log(err));

    const properties = await propertiesCollection
      .find()
      .execute()
      .catch(err => console.log(err));

    const count = await propertiesCollection
      .count()
      .catch(err => console.log(err));

    console.log(insertedProperty, properties, count);
  });

app.get('/', (req, res) => {
  res.send('Welcome to ilemauricebooking-service.');
});

const port = process.env.PORT || 4001;

app.listen(port, () => console.log(`Listening on port ${port}!`));