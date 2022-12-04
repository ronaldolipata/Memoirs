import mongoose from 'mongoose';

const postIdValidation = (req, res, next) => {
  const postId = req.params.postId || req.header('X-POST-ID');
  const { Types } = mongoose;

  // Check if valid ObjectId
  if (!Types.ObjectId.isValid(postId)) {
    return res.status(422).json({
      Error: 'Invalid Post ID',
    });
  }

  next();
};

export default postIdValidation;
