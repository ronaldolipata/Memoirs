import Post from '../models/Post.js';
import cloudinaryV2 from '../utils/cloudinary.js';

// Create new Post
const createPost = async (req, res) => {
  // Get the logged in userId and use it as the authorId
  const authorId = req.header('X-USER-ID');
  const { image } = req.body;

  // If User changed profile picture, then upload image to Cloudinary
  // and get the URL from result. Finally, add the URL to formData object
  try {
    const result = await cloudinaryV2.uploader.upload(image, {
      folder: 'Memoirs',
    });

    await Post.create({
      authorId,
      ...req.body,
      imageUrl: result.url,
      privacy: 'Public',
    });

    res.status(201).json({
      Message: 'Post successfully uploaded',
    });
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
};

// Search Post by Post ID
const searchPostById = async (req, res) => {
  const postId = req.params.postId || req.header('X-POST-ID');

  const searchPost = await Post.findOne({
    _id: postId,
  });

  res.status(200).json(searchPost);
};

// Update Post
const updatePost = async (req, res) => {
  const postId = req.header('X-POST-ID');

  try {
    await Post.findByIdAndUpdate(
      { _id: postId },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.status(200).json({
      Message: 'Post successfully updated',
    });
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
};

// Soft delete Post
const softDeletePost = async (req, res) => {
  const postId = req.header('X-POST-ID');

  try {
    await Post.findByIdAndUpdate(
      { _id: postId },
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
      Message: `Post is now deleted`,
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
