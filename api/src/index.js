import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import express from 'express';

import passport from 'passport';
import middlewarePassport from './middleware/passport';

import { connectDb } from './models';
import routes from './routes';

import config from './utils/config';

const environment = process.env.NODE_ENV;
const stage = config;

const app = express();

app.use(passport.initialize());
middlewarePassport(passport);

app.use(cors());
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (environment !== 'production') {
  app.use(morgan('dev'));
}

connectDb().then(async () => {
  app.listen(`${stage.development.port}`, () => {
    console.log(
      `🚀 Server ready at http://localhost:${stage.development.port}`,
    );
  });
});

app.use('/api/client', routes.client);
app.use('/api/company', routes.company);
app.use('/api/auth', routes.auth);
