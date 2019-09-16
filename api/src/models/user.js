import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  start_date: {
    type: Date,
    default: Date.now,
  },
  full_name: {
    type: String,
    default: 'asd',
    minlength: 3,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    default: 'asd',
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema, 'users');

export default User;
