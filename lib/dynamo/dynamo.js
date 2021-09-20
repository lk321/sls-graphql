const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.scan = (params) => new Promise(
  (resolve, reject) => dynamoDb.scan(params).promise()
    .then((data) => resolve(data.Items))
    .catch((err) => reject(err)),
);

module.exports.get = (params) => new Promise(
  (resolve, reject) => dynamoDb.get(params).promise()
    .then((data) => resolve(data.Item))
    .catch((err) => reject(err)),
);

module.exports.createItem = (params) => new Promise(
  (resolve, reject) => dynamoDb.put(params).promise()
    .then(() => resolve(params.Item))
    .catch((err) => reject(err)),
);

module.exports.updateItem = (params, args) => new Promise(
  (resolve, reject) => dynamoDb.update(params).promise()
    .then(() => resolve(args))
    .catch((err) => reject(err)),
);

module.exports.deleteItem = (params, args) => new Promise(
  (resolve, reject) => dynamoDb.delete(params).promise()
    .then(() => resolve(args))
    .catch((err) => reject(err)),
);
