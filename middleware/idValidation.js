import mongoose from 'mongoose';

const idValidation = (req, res, next) => {
  const authorId = req.header('X-USER-ID');
  const { Types } = mongoose;

  // Check if valid ObjectId
  if (!Types.ObjectId.isValid(authorId)) {
    return res.status(422).json({
      Error: 'Invalid ID',
    });
  }

  next();
};

export default idValidation;
