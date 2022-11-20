import User from '../models/User.js';

const checkIfUserExists = async (req, res, next) => {
  const authorId = req.header('X-USER-ID');

  const idExists = await User.findOne({
    _id: authorId,
  });

  if (!idExists) {
    return res.status(404).json({
      Error: 'No User found',
    });
  }

  next();
};

export default checkIfUserExists;
