import express from 'express';
import createPostFieldsValidation from '../middleware/createPostFieldsValidation.js';
import idValidation from '../middleware/idValidation.js';
import checkIfUserIdExists from '../middleware/checkIfUserIdExists.js';
import checkIfPostExists from '../middleware/checkIfPostExists.js';
import postIdValidation from '../middleware/postIdValidation.js';
import postController from '../controllers/posts.js';

const router = express.Router();

router.post(
  '/create',
  createPostFieldsValidation,
  idValidation,
  checkIfUserIdExists,
  postController.createPost
);

router
  .route('/:postId')
  .get(
    idValidation,
    checkIfUserIdExists,
    postIdValidation,
    checkIfPostExists,
    postController.searchPostById
  )
  .patch(
    idValidation,
    checkIfUserIdExists,
    postIdValidation,
    checkIfPostExists,
    postController.updatePost
  )
  .delete(
    idValidation,
    checkIfUserIdExists,
    postIdValidation,
    checkIfPostExists,
    postController.softDeletePost
  );

export default router;
