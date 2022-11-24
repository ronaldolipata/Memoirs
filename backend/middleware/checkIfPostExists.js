import Post from '../models/Post.js';

const checkIfPostExists = async (req, res, next) => {
  const postId = req.params.postId;

  const postExists = await Post.findOne({
    _id: postId,
  });

  if (!postExists) {
    return res.status(404).json({
      Error: 'Post does not exists',
    });
  }

  // Pass the data of Post to req.post if existed
  req.post = postExists;
  req.postId = postId;

  next();
};

export default checkIfPostExists;
