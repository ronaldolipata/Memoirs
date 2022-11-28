import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import cloudinaryV2 from '../utils/cloudinary.js';
import User from '../models/User.js';
import Post from '../models/Post.js';

// Create new User
const createUser = asyncHandler(async (req, res) => {
  const { password, image } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await cloudinaryV2.uploader.upload(image, {
    folder: 'Memoirs',
  });

  try {
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      imageUrl: result.url,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);

  try {
    const user = await User.findOne({
      username,
    });

    const hashedPassword = user.password;

    if (user && (await bcrypt.compare(password, hashedPassword))) {
      console.log(user);
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
});

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

  res.status(200).json(userProfile);
};

export default {
  searchUserByUsername,
  createUser,
  loginUser,
};
