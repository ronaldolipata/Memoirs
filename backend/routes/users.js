import express from 'express';
import createUserFieldsValidation from '../middleware/createUserFieldsValidation.js';
import emailValidation from '../middleware/emailValidation.js';
import usernameValidation from '../middleware/usernameValidation.js';
import checkIfUserExists from '../middleware/checkIfUserExists.js';
import userController from '../controllers/users.js';
import postController from '../controllers/posts.js';

const router = express.Router();

router.post('/:username/post', checkIfUserExists, postController.createPost);

router.get(
  '/:username',
  checkIfUserExists,
  userController.searchUserByUsername
);

router.post(
  '/create',
  createUserFieldsValidation,
  usernameValidation,
  emailValidation,
  userController.createUser
);

export default router;
