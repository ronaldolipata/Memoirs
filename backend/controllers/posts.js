import Post from '../models/Post.js';

// Create new Post
const createPost = async (req, res) => {
  const authorId = req.header('X-USER-ID');
  const { title, content, imageUrl, privacy } = req.body;

  try {
    const newPost = await Post.create({
      authorId,
      title,
      content,
      imageUrl,
      privacy,
    });
    res.status(201).send(newPost);
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
};

// Search Post by Post ID
const searchPostById = (req, res) => {
  res.status(200).send(req.post);
};

// Update Post
const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: req.postId },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
};

// Soft delete Post
const softDeletePost = async (req, res) => {
  try {
    const softDeletePost = await Post.findByIdAndUpdate(
      { _id: req.postId },
      { deletedAt: Date.now() },
      { new: true }
    );
    res.status(200).send(softDeletePost);
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
};

// Delete Post
const deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.postId });
    res.status(200).json({
      Message: `Post ID: ${req.postId} is now delete`,
    });
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
};

export default {
  createPost,
  searchPostById,
  updatePost,
  softDeletePost,
  deletePost,
};