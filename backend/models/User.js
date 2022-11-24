import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  imageUrl: {
    type: String,
  },
  bio: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    required: true,
  },
});

const User = model('User', userSchema);
export default User;
