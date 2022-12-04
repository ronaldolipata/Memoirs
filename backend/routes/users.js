import express from 'express';
import userDetailsFieldValidation from '../middleware/userDetailsFieldValidation.js';
import emailValidation from '../middleware/emailValidation.js';
import usernameValidation from '../middleware/usernameValidation.js';
import checkIfUserExists from '../middleware/checkIfUserExists.js';
import userController from '../controllers/users.js';
import postController from '../controllers/posts.js';

const router = express.Router();

router.post(
  '/register',
  userDetailsFieldValidation,
  usernameValidation,
  emailValidation,
  userController.createUser
);

router.patch('/update', userDetailsFieldValidation, userController.updateUser);

router.get('/login', checkIfUserExists, userController.loginUser);

router.get(
  '/:username',
  checkIfUserExists,
  userController.searchUserByUsername
);

router.post('/:username/post', checkIfUserExists, postController.createPost);

export default router;
