import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;

const phoneSchema = new Schema({
  phone: {
    type: String,
    required: true,
    validate: {
      validator: phone =>
        validator.isMobilePhone(phone, 'uk-UA', {
          strictMode: true,
        }),
      message: props => `${props.value} is not a valid phone number!`,
    },
    unique: true,
  },
  description: {
    type: String,
    default: '',
  },
});

const clientSchema = new Schema({
  start_date: {
    type: Date,
    default: Date.now,
  },
  full_name: {
    type: String,
    required: true,
    minlength: 3,
  },
  phones: {
    type: [phoneSchema],
    required: true,
  },
  importance_class: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: '',
  },
  price_lvl: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId,
  },
  company: {
    ref: 'companies',
    type: Schema.Types.ObjectId,
  },
});

const Client = mongoose.model('Client', clientSchema, 'clients');

export default Client;
