const reducer = (previousState, action) => {
  switch (action.type) {
    case 'user':
      return {
        ...previousState,
        user: action.payload,
      };
    case 'posts':
      return {
        ...previousState,
        posts: action.payload,
      };
    default:
      return {
        ...previousState,
      };
  }
};

export default reducer;
