const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    Error: err?.message || 'Something went wrong',
  });
};

export default errorHandler;
