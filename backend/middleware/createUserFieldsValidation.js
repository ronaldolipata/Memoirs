const createUserFieldsValidation = (req, res, next) => {
  const { firstName, lastName, username, password, email, country } = req.body;

  if (!firstName) {
    return res.status(422).json({
      Error: 'First name is required',
    });
  }

  if (!lastName) {
    return res.status(422).json({
      Error: 'Last name is required',
    });
  }
  if (!username) {
    return res.status(422).json({
      Error: 'Username is required',
    });
  }
  if (!password) {
    return res.status(422).json({
      Error: 'Password is required',
    });
  }
  if (!email) {
    return res.status(422).json({
      Error: 'Email is required',
    });
  }

  next();
};

export default createUserFieldsValidation;
