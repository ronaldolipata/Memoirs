import mongoose from 'mongoose';
import cloudinaryV2 from '../utils/cloudinary.js';
import User from '../models/User.js';
import Post from '../models/Post.js';

// Create new User
const createUser = async (req, res) => {
  const { imageUrl } = req.body;
  let newImageUrl;

  // If user didn't input an image, then set the imageUrl with the default image profile
  if (imageUrl === null || imageUrl === undefined) {
    newImageUrl =
      'https://res.cloudinary.com/dkpg4tdoq/image/upload/v1670180212/Memoirs/default-user-picture_xuvvk1.png';
  }

  // If image is thruthy or user has an input image, then upload it to Cloudinary
  if (imageUrl) {
    const result = await cloudinaryV2.uploader.upload(imageUrl, {
      folder: 'Memoirs',
    });
    // Assign URL from the result to imageUrl
    newImageUrl = result.url;
  }

  try {
    await User.create({
      ...req.body,
      imageUrl: newImageUrl,
    });
    res.status(201).json({
      Message: 'Successfully registered',
    });
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
};

// Update User
const updateUser = async (req, res) => {
  const userId = req.header('X-USER-ID');

  const { image } = req.body;

  const formData = {
    ...req.body,
    imageUrl: image,
  };

  // If User changed profile picture, then upload image to Cloudinary
  // and get the URL from result. Finally, add the URL to formData object
  if (image !== null) {
    const result = await cloudinaryV2.uploader.upload(image, {
      folder: 'Memoirs',
    });

    formData.imageUrl = result.url;
  }

  try {
    await User.findByIdAndUpdate({ _id: userId }, formData, { new: true });
    res.status(200).json({
      Message: 'User profile successfully updated',
    });
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  // const { username, password } = req.body;
  const username = req.header('X-USERNAME');
  const password = req.header('X-PASSWORD');

  try {
    const user = await User.findOne({
      username,
    });

    if (user && password !== user.password) {
      return res.status(200).json({
        Error: 'Invalid password',
      });
    }

    res.status(200).json({
      Message: 'Successfully logged in',
    });
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
};

// Search User by Username
const searchUserByUsername = async (req, res) => {
  // Object from checkIfUserExists middleware
  const userDetails = req.user;
  const { limit, offset } = req.query;

  // Search User which match the authorId
  const pipelines = [
    {
      $match: {
        authorId: mongoose.Types.ObjectId(req.userId),
      },
    },
    {
      $match: {
        deletedAt: null,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ];

  // Push to pipelines if limit is given
  if (limit !== undefined || limit !== null || !isNaN(limit)) {
    pipelines.push({
      $limit: parseInt(limit),
    });
  }

  // Push to pipelines if offset is given
  if (offset !== undefined || offset !== null || !isNaN(offset)) {
    pipelines.push({
      $skip: parseInt(offset),
    });
  }

  // Get all Posts of User
  const userPosts = await Post.aggregate(pipelines);

  // Assign user details and user posts to User Profile
  const userProfile = {
    userDetails,
    userPosts,
  };

  // Send response with complete User profile details
  res.status(200).json(userProfile);
};

export default {
  searchUserByUsername,
  createUser,
  updateUser,
  loginUser,
};
