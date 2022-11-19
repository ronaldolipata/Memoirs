import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postchema = new Schema({
  authorId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    required: true,
  },
  privacy: {
    type: String,
    required: true,
  },
});

const Post = model('Post', postchema);
export default Post;
