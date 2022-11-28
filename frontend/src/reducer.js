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
    case 'userId':
      return {
        ...previousState,
        userId: action.payload,
      };
    case 'username':
      return {
        ...previousState,
        username: action.payload,
      };
    case 'searchedUser':
      return {
        ...previousState,
        searchedUser: action.payload,
      };
    case 'searchedUserPosts':
      return {
        ...previousState,
        searchedUserPosts: action.payload,
      };
    case 'searchedUserId':
      return {
        ...previousState,
        searchedUserId: action.payload,
      };
    case 'searchedUsername':
      return {
        ...previousState,
        searchedUsername: action.payload,
      };
    case 'usernameParams':
      return {
        ...previousState,
        usernameParams: action.payload,
      };
    default:
      return {
        ...previousState,
      };
  }
};

export default reducer;
