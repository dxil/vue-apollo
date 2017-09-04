import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { printSchema } from 'graphql/utilities/schemaPrinter';

import mongoose from 'mongoose'

import { pubsub } from './data/subscriptions';
import schema from './data/schema';

import getMeeting from './controllers/index/1.js'
import getMeetingApplication from './controllers/index/2.js'
import getMeetingApplicationCompany from './controllers/index/3.js'

const GRAPHQL_PORT = 8080;
const WS_PORT = 8090;
const dbUrl = 'mongodb://localhost:3001/meteor';

const app = express()
const graphQLServer = app.use('*', cors());

mongoose.Promise = global.Promise;

mongoose.connect(dbUrl, {
  useMongoClient: true,
  /* other options */
});

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {},
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.use('/schema', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(printSchema(schema));
});

app.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));

app.get('/pub', function (req, res) {
  console.log(req)
  pubsub.publish('postUpvoted', 3);
  console.log(res)
})
app.get('/index/1', getMeeting)
app.get('/index/2', getMeetingApplication)
app.get('/index/3', getMeetingApplicationCompany)
