import User from '../models/User.js';

const checkIfUserExists = async (req, res, next) => {
  const username = req.params.username;

  const userExists = await User.findOne({
    username: username,
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
