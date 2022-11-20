import express from 'express';
import User from '../models/User.js';
import createUserFieldsValidation from '../middleware/createUserFieldsValidation.js';
import emailValidation from '../middleware/emailValidation.js';
import idValidation from '../middleware/idValidation.js';
import checkIfUserExists from '../middleware/checkIfUserExists.js';
import checkIfUsernameExists from '../middleware/checkIfUsernameExists.js';

const router = express.Router();

// Search User by ID
router.get('/', idValidation, checkIfUserExists, async (req, res) => {
  res.status(200).send(req.user);
});

// Create new User
router.post(
  '/create',
  createUserFieldsValidation,
  checkIfUsernameExists,
  emailValidation,
  async (req, res) => {
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
  }
);

export default router;
