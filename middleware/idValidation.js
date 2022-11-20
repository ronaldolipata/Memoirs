import mongoose from 'mongoose';
import User from '../models/User.js';

const idValidation = async (req, res, next) => {
  const authorId = req.header('X-AUTHOR-ID');
  const { Types } = mongoose;

  // Check if valid ObjectId
  if (!Types.ObjectId.isValid(authorId)) {
    return res.status(422).json({
      Error: 'Invalid ID',
    });
  }

  const idExists = await User.findOne({
    _id: authorId,
  });

  if (!idExists) {
    return res.status(404).json({
      Error: 'No User found',
    });
  }

  next();
};

export default idValidation;
