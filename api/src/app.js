import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import typeDefs from './schema.gql';
import resolvers from './resolvers';
import { endpointURL, isDevelopment } from './utils/config';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {},
  debug: isDevelopment
});

server.applyMiddleware({ app, path: endpointURL });

export default app;
