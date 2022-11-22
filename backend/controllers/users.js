import User from '../models/User.js';
import Post from '../models/Post.js';

// Search User by Username
const searchUserByUsername = async (req, res) => {
  // From checkIfUserExists middleware
  const userDetails = req.user;

  // Get all Posts for User
  const userPosts = await Post.find({
    authorId: req.userId,
  });

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
      bio,
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
