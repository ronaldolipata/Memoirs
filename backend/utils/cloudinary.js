import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

// Configure .env file to use
dotenv.config();

const cloudinaryV2 = cloudinary.v2;

cloudinaryV2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

export default cloudinaryV2;
