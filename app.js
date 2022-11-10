import express from 'express';
import process from 'node:process';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
