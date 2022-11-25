import express from 'express';
import process from 'node:process';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/users.js';
import postRouter from './routes/posts.js';
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// Configure .env file to use
dotenv.config();

// Use PORT from .env file if exists. Otherwise, use PORT 3000
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.status(200).json({
    Message: 'Welcome to Memoirs!',
  });
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
