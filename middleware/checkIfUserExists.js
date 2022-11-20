import User from '../models/User.js';

const checkIfUserExists = async (req, res, next) => {
  const authorId = req.header('X-USER-ID');

  const userExists = await User.findOne({
    _id: authorId,
  });

  if (!userExists) {
    return res.status(404).json({
      Error: 'No User found',
    });
  }

  req.user = userExists;

  next();
};

export default checkIfUserExists;
