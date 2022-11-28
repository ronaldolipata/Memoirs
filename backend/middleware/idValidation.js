import mongoose from 'mongoose';

const idValidation = (req, res, next) => {
  // const authorId = req.header('X-USER-ID');

  if (req.userId === undefined) {
    return res.status(422).json({
      Error: 'No User ID provided',
    });
  }

  if (req.postId === undefined) {
    return res.status(422).json({
      Error: 'No User ID provided',
    });
  }

  // Check if valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.userId)) {
    return res.status(422).json({
      Error: 'Invalid User ID',
    });
  }

  // Check if valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.postId)) {
    return res.status(422).json({
      Error: 'Invalid Post ID',
    });
  }

  next();
};

export default idValidation;
