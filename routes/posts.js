import express from 'express';
import Post from '../models/Post.js';
import createPostFieldsValidation from '../middleware/createPostFieldsValidation.js';
import idValidation from '../middleware/idValidation.js';

const router = express.Router();

router.post(
  '/create',
  createPostFieldsValidation,
  idValidation,
  async (req, res) => {
    const authorId = req.header('X-AUTHOR-ID');
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

export default router;
