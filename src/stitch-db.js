require('dotenv').config();

const { StitchClientFactory, BSON } = require('mongodb-stitch');
const ObjectId = BSON.ObjectId;

// Local
const connection = {};

async function connect() {
  if (connection.isConnected)
    return connection;

  try {
    const client = await StitchClientFactory.create(process.env.MONGODB_STITCH_APPID);
    const service = client.service('mongodb', 'mongodb-atlas');
    const db = service.db(process.env.MONGODB_STITCH_DB);
    const ownerId = await client.login();
    const isConnected = true;

    return Object.assign(connection, {
      isConnected,
      db,
      ownerId,
      ObjectId
    });
  } catch (e) {
    console.error(e)
  }
}

async function test() {
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
}

module.exports = {
  connect,
  test
}