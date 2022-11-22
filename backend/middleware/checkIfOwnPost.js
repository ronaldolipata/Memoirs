import Post from '../models/Post.js';

const checkIfOwnPost = async (req, res, next) => {
  const postId = req.params.postId;
  const authorId = req.header('X-USER-ID');

  const isOwnPost = await Post.where('_id')
    .equals(postId)
    .where('authorId')
    .equals(authorId);

  if (isOwnPost.length === 0) {
    return res.status(400).json({
      Error: 'You do not have access in the Post.',
    });
  }

  next();
};

export default checkIfOwnPost;
