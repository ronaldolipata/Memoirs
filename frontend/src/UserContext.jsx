import { createContext, useReducer } from 'react';
import reducer from '@/reducer';

export const UserContext = createContext();

const UserContextComponent = ({ children }) => {
  const initialState = {
    user: {},
    posts: [],
    userId: null,
    username: null,
    postId: null,
    searchedUser: {},
    searchedUserPosts: [],
    searchedUserId: null,
    searchedUsername: null,
    usernameParams: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const appendUserId = (userId) => {
    dispatch({
      type: 'userId',
      payload: userId,
    });
  };

  const appendUsername = (username) => {
    dispatch({
      type: 'username',
      payload: username,
    });
  };

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

  const appendSearchedUserDetails = (searchedUser) => {
    dispatch({
      type: 'searchedUser',
      payload: searchedUser,
    });
  };

  const appendSearchedUserPosts = (searchedUserPosts) => {
    dispatch({
      type: 'searchedUserPosts',
      payload: searchedUserPosts,
    });
  };

  const appendSearchedUserId = (searchedUserId) => {
    dispatch({
      type: 'searchedUserId',
      payload: searchedUserId,
    });
  };

  const appendSearchedUsername = (searchedUsername) => {
    dispatch({
      type: 'searchedUsername',
      payload: searchedUsername,
    });
  };

  const appendUsernameParams = (usernameParams) => {
    dispatch({
      type: 'usernameParams',
      payload: usernameParams,
    });
  };

  // Update User data to UserContext
  const updateUserData = async (username) => {
    try {
      const response = await fetch(
        `https://memoirs.onrender.com/api/v1/users/${username}?limit=6&offset=0`
      );
      const data = await response.json();

      appendUserDetails(data.userDetails);
      appendUserPosts(data.userPosts);
      appendUserId(data.userDetails.userId);
      appendUsername(data.userDetails.username);
      appendUsernameParams(data.userDetails.username);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        updateUserData,
        appendUserDetails,
        appendUserPosts,
        appendUserId,
        appendUsername,
        appendSearchedUserDetails,
        appendSearchedUserPosts,
        appendSearchedUserId,
        appendSearchedUsername,
        appendUsernameParams,
        user: state.user,
        userId: state.user._id,
        username: state.username,
        posts: state.posts,
        searchedUser: state.searchedUser,
        searchedUserPosts: state.searchedUserPosts,
        usernameParams: state.usernameParams,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextComponent;
