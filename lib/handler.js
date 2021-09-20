const { graphqlLambda } = require('graphql-server-lambda');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

// Types
const artistType = require('./data/types/artist');
const songType = require('./data/types/song');

// Resolvers
const artistResolver = require('./data/resolvers/artist');
const songResolver = require('./data/resolvers/song');

const typeDefs = mergeTypeDefs([artistType, songType]);
const resolvers = mergeResolvers([artistResolver, songResolver]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

exports.graphql = (event, context, callback) => {
  const callbackFilter = (error, output) => {
    const outputWithHeader = {
      ...output,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
    callback(error, outputWithHeader);
  };

  graphqlLambda({ schema })(event, context, callbackFilter);
};

exports.record = (event, context, callback) => {
  event.Records.forEach((record) => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  });
  callback(null, `Successfully processed ${event.Records.length} records.`);
};
