import express from 'express';
import process from 'node:process';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/users.js';
import postRouter from './routes/posts.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Configure .env file to use
dotenv.config();

// Use PORT from .env file if exists. Otherwise, use PORT 3000
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.DB_URL);

mongoose.connection.on('open', () => {
  console.log('Connected');
});

app.use(express.json());
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.status(200).json({
    Message: 'Welcome to Memoirs!',
  });
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
