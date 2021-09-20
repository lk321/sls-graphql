const { v1: uuid } = require('uuid');
const db = require('./dynamo');

const TableName = 'artists';

module.exports.getArtists = () => {
  const params = {
    TableName,
    AttributesToGet: [
      'id',
      'first_name',
      'last_name',
    ],
  };

  return db.scan(params);
};

module.exports.getArtistById = (id) => {
  const params = {
    TableName,
    Key: {
      id,
    },
  };

  return db.get(params);
};

module.exports.createArtist = (args) => {
  const params = {
    TableName,
    Item: {
      id: uuid(),
      first_name: args.first_name,
      last_name: args.last_name,
    },
  };
  console.log('params', params);
  return db.createItem(params);
};

module.exports.updateArtist = (args) => {
  const params = {
    TableName: 'artists',
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: {
      ':first_name': args.first_name,
      ':last_name': args.last_name,
    },
    UpdateExpression: 'SET first_name = :first_name, last_name = :last_name',
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
};

module.exports.deleteArtist = (args) => {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
};
