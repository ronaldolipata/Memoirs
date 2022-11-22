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

  // const userPosts = await User.populate({
  //   username: username,
  // });

  req.user = userExists;
  req.userId = userExists._id.valueOf();

  next();
};

export default checkIfUserExists;
