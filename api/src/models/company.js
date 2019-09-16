import mongoose from 'mongoose';

const { Schema } = mongoose;

const companySchema = new Schema({
  start_date: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
});

const Company = mongoose.model('Company', companySchema, 'companies');

export default Company;
