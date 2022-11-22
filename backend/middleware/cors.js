const cors = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
};

export default cors;
