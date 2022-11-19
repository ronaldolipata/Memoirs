import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const interactionSchema = new Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  postId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
    required: true,
  },
});

const Interaction = model('Interaction', interactionSchema);
export default Interaction;
