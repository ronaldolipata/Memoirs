import mongoose from 'mongoose';

const convertToObjectId = (req, res, next) => {
  const userId = req.header('X-USER-ID');
  const postId = req.header('X-POST-ID');
  req.userId = mongoose.Types.ObjectId(userId);
  req.postId = mongoose.Types.ObjectId(postId);

  next();
};

export default convertToObjectId;
