import mongoose from 'mongoose';
import User from './User.js';

const { Schema, model } = mongoose;

const postchema = new Schema({
  authorId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: User,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  privacy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    required: true,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

const Post = model('Post', postchema);
export default Post;
