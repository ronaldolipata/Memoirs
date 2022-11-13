import express from 'express';
import process from 'node:process';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    Message: 'Welcome to Memoirs!',
  });
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
