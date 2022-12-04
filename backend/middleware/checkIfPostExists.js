import Post from '../models/Post.js';

const checkIfPostExists = async (req, res, next) => {
  const postId = req.params.postId || req.header('X-POST-ID');

  const postExists = await Post.findOne({
    _id: postId,
  });

  if (!postExists) {
    return res.status(404).json({
      Error: 'Post does not exists',
    });
  }

  next();
};

export default checkIfPostExists;
