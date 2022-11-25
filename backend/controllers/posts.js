import mongoose from 'mongoose';
import Post from '../models/Post.js';
import cloudinaryV2 from '../utils/cloudinary.js';

// Create new Post
const createPost = async (req, res) => {
  const authorId = req.header('X-USER-ID');
  const { username, title, content } = req.body;

  try {
    const result = await cloudinaryV2.uploader.upload(req.body.image, {
      folder: 'Memoirs',
      // width: 320,
      // crop: 'scale',
    });

    await Post.create({
      // authorId,
      authorId: mongoose.Types.ObjectId('637e9721ee5d1bd3242dfc94'),
      title,
      content,
      imageUrl: result.url,
      privacy: 'Public',
    });
    // res.status(201).json(newPost);
    res.writeHead(302, {
      Location: `http://127.0.0.1:5173/${username}`,
    });
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
};

// Search Post by Post ID
const searchPostById = (req, res) => {
  res.status(200).json(req.post);
};

// Update Post
const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: req.postId },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
};

// Soft delete Post
const softDeletePost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(
      { _id: req.postId },
      { deletedAt: Date.now() },
      { new: true }
    );
    res.status(200).json({
      Message: 'Post successfully deleted',
    });
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
