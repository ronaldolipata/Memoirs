import User from '../models/User.js';

const usernameValidation = async (req, res, next) => {
  const { username } = req.body;

  const usernameExists = await User.findOne({
    username: username,
  });

  if (usernameExists) {
    return res.status(422).json({
      Error: 'Username already exists',
    });
  }

  next();
};

export default usernameValidation;
