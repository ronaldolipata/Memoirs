import express from 'express';
import Post from '../models/Post.js';
import createPostFieldsValidation from '../middleware/createPostFieldsValidation.js';
import idValidation from '../middleware/idValidation.js';
import checkIfUserIdExists from '../middleware/checkIfUserIdExists.js';
import checkIfPostExists from '../middleware/checkIfPostExists.js';
import postIdValidation from '../middleware/postIdValidation.js';

const router = express.Router();

// Create new Post
router.post(
  '/create',
  createPostFieldsValidation,
  idValidation,
  checkIfUserIdExists,
  async (req, res) => {
    const authorId = req.header('X-USER-ID');
    const { title, content, imageUrl, privacy } = req.body;

    try {
      const newPost = await Post.create({
        authorId,
        title,
        content,
        imageUrl,
        privacy,
      });
      res.status(201).send(newPost);
    } catch (error) {
      res.status(400).json({
        Error: error.message,
      });
    }
  }
);

// Search Post by Post ID

router
  .route('/:postId')
  .get(postIdValidation, checkIfPostExists, (req, res) => {
    res.status(200).send(req.post);
  })
  .patch(postIdValidation, checkIfPostExists, async (req, res) => {
    const postId = req.params.postId;
    const { title, content, imageUrl, privacy } = req.body;

    try {
      const updatedPost = await Post.findByIdAndUpdate(
        { _id: postId },
        {
          $set: {
            title,
            content,
            imageUrl,
            privacy,
          },
        },
        { new: true }
      );
      res.status(200).send(updatedPost);
    } catch (error) {
      res.status(400).json({
        Error: error.message,
      });
    }
  });

export default router;
