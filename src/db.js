require('dotenv').config();

const {
  BSON,
  StitchClientFactory
} = require('mongodb-stitch');

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

module.exports = {
  connect
}