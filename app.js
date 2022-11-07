import express from 'express';
import process from 'process';

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT);
