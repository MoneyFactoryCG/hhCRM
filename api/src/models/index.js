import mongoose from 'mongoose';

import Client from './client';
import Employee from './employee';
import Company from './company';
import User from './user';
// eslint-disable-next-line
const connectDb = () => {
  if (process.env.NODE_ENV !== 'production') {
    return mongoose.connect(process.env.TEST_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    });
  }

  if (process.env.NODE_ENV === 'production') {
    return mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    });
  }
};

const models = { Client, Employee, Company, User };

export { connectDb };

export default models;
