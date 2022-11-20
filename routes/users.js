import express from 'express';
import User from '../models/User.js';
import keyValidation from '../middleware/keysValidation.js';
import emailValidation from '../middleware/emailValidation.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  // Use limit and offset queries if exists. Otherwise, use default values.
  const limit = req.query.limit || 3;
  const offset = req.query.offset || 0;

  try {
    const showUser = await User.aggregate([
      { $limit: parseInt(limit) },
      { $skip: parseInt(offset) },
    ]);
    res.status(200).send(showUser);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/create', keyValidation, emailValidation, async (req, res) => {
  const { firstName, lastName, username, password, email, bio, country } =
    req.body;

  // Create new User from request body
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
    console.log(error.message);
  }
});

export default router;
