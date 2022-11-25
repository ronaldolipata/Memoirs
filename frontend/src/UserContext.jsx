import { createContext, useReducer } from 'react';
import reducer from '@/reducer';

export const UserContext = createContext();

const UserContextComponent = ({ children }) => {
  const initialState = {
    user: {},
    posts: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const appendUserDetails = (user) => {
    dispatch({
      type: 'user',
      payload: user,
    });
  };

  const appendUserPosts = (posts) => {
    dispatch({
      type: 'posts',
      payload: posts,
    });
  };

  return (
    <UserContext.Provider
      value={{
        appendUserDetails,
        appendUserPosts,
        user: state.user,
        userId: state.user._id,
        posts: state.posts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextComponent;
