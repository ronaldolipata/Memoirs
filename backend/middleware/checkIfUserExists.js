import User from '../models/User.js';

const checkIfUserExists = async (req, res, next) => {
  const username = req.params.username || req.header('X-USERNAME');

  const userExists = await User.findOne({
    username: username,
  });

  if (!userExists) {
    return res.status(404).json({
      Error: 'No User found',
    });
  }

  // Pass the data user details to use from searchUsernameById function from controllers
  req.user = userExists;
  req.userId = userExists._id.valueOf();

  next();
};

export default checkIfUserExists;
