import mongoose from 'mongoose';

const idValidation = (req, res, next) => {
  const userId = req.header('X-USER-ID');
  // const postId = req.postId || req.header('X-POST-ID');

  if (userId === undefined) {
    return res.status(422).json({
      Error: 'No User ID provided',
    });
  }

  // if (postId === undefined) {
  //   return res.status(422).json({
  //     Error: 'No Post ID provided',
  //   });
  // }

  // Check if valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(422).json({
      Error: 'Invalid User ID',
    });
  }

  // // Check if valid ObjectId
  // if (!mongoose.Types.ObjectId.isValid(postId)) {
  //   return res.status(422).json({
  //     Error: 'Invalid Post ID',
  //   });
  // }

  next();
};

export default idValidation;
