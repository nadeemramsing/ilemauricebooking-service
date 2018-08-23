require('dotenv').config();

const
  express = require('express'),
  db = require('./db'),

  app = express();

db
  .connect()
  .then(async connection => {
    const propertiesCollection = connection.db.collection('properties');

    try {
      const insertedProperty = await propertiesCollection.insertOne({
        name: 'Nadeem',
        owner_id: connection.ownerId
      })

      const properties = await propertiesCollection
        .find()
        .execute();

      console.log(properties);
    } catch (e) {
      console.error(e);
    }
  });

app.get('/', (req, res) => {
  res.send('Welcome to ilemauricebooking-service.');
});

const port = process.env.PORT || 4001;

app.listen(port, () => console.log(`Listening on port ${port}!`));