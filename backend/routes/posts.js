import express from 'express';
import createPostFieldsValidation from '../middleware/createPostFieldsValidation.js';
import idValidation from '../middleware/idValidation.js';
import convertToObjectId from '../middleware/convertToObjectId.js';
import checkIfUserIdExists from '../middleware/checkIfUserIdExists.js';
import checkIfPostExists from '../middleware/checkIfPostExists.js';
import postIdValidation from '../middleware/postIdValidation.js';
import postController from '../controllers/posts.js';
import checkIfOwnPost from '../middleware/checkIfOwnPost.js';

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
  .get(postIdValidation, checkIfPostExists, postController.searchPostById)
  .patch(
    convertToObjectId,
    idValidation,
    checkIfUserIdExists,
    postIdValidation,
    checkIfPostExists,
    checkIfOwnPost,
    postController.updatePost
  )
  .delete(
    convertToObjectId,
    idValidation,
    checkIfUserIdExists,
    postIdValidation,
    checkIfPostExists,
    checkIfOwnPost,
    postController.softDeletePost
  );

export default router;
