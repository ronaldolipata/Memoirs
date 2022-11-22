import User from '../models/User.js';

// Search User by Username
const searchByUsername = (req, res) => {
  res.status(200).send(req.user);
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
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }
};

export default {
  searchByUsername,
  createUser,
};
