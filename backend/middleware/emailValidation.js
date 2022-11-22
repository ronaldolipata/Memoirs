import User from '../models/User.js';
import emailValidator from 'email-validator';

const emailValidation = async (req, res, next) => {
  const { email } = req.body;
  const isValidEmail = emailValidator.validate(email);

  // Used email validator package to check if email is valid
  if (!isValidEmail) {
    return res.status(422).json({
      Error: `${email} is not a valid email address`,
    });
  }

  try {
    const findEmail = await User.findOne({ email: email });
    if (findEmail) {
      return res.status(422).json({
        Error: 'Email is already exists',
      });
    }
  } catch (error) {
    res.status(400).json({
      Error: error.message,
    });
  }

  next();
};

export default emailValidation;
