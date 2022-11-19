import User from '../models/User.js';

const emailValidation = async (req, res, next) => {
  const { email } = req.body;

  try {
    const findEmail = await User.findOne({ email: email });
    if (findEmail) {
      return res.status(422).json({
        Error: `The email address of ${email} is already exists`,
      });
    }
  } catch (error) {
    console.log(error.message);
  }

  next();
};

export default emailValidation;
