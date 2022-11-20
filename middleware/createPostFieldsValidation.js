const createPostFieldsValidation = (req, res, next) => {
  const authorId = req.header('X-USER-ID');
  const { title, content, imageUrl, privacy } = req.body;

  if (!authorId) {
    return res.status(422).json({
      Error: 'Author ID is required',
    });
  }
  if (!title) {
    return res.status(422).json({
      Error: 'Title is required',
    });
  }
  if (!content) {
    return res.status(422).json({
      Error: 'Content is required',
    });
  }
  if (!imageUrl) {
    return res.status(422).json({
      Error: 'Image is required',
    });
  }
  if (!privacy) {
    return res.status(422).json({
      Error: 'Privacy is required',
    });
  }

  next();
};

export default createPostFieldsValidation;
