import User from '../models/User.js';

const checkIfUserIdExists = async (req, res, next) => {
  const authorId = req.header('X-USER-ID');

  const userIdExists = await User.findOne({
    _id: authorId,
  });

  if (!userIdExists) {
    return res.status(404).json({
      Error: 'No User found',
    });
  }

  next();
};

export default checkIfUserIdExists;
