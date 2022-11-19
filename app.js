import express from 'express';
import process from 'node:process';
import dotenv from 'dotenv';

const app = express();

// Configure .env file to use
dotenv.config();

// Use PORT from .env file if exists. Otherwise, use PORT 3000
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    Message: 'Welcome to Memoirs!',
  });
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
