import User from '../models/User.js';

const checkIfUsernameExists = async (req, res) => {
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

export default checkIfUsernameExists;
