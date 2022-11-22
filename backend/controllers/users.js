import mongoose from 'mongoose';
import User from '../models/User.js';
import Post from '../models/Post.js';

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
  ];

  // Push to pipelines if limit is given
  if (limit !== undefined || !isNaN(limit)) {
    pipelines.push({
      $limit: parseInt(limit),
    });
  }

  // Push to pipelines if offset is given
  if (offset !== undefined || !isNaN(offset)) {
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

// Create new User
const createUser = async (req, res) => {
  const { firstName, lastName, username, password, email, bio, country } =
    req.body;

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      password,
      email,
      country,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
};

export default {
  searchUserByUsername,
  createUser,
};
