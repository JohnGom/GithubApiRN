import {
    GET_USER_REPOS,
    SEARCH_REPOS,
    CLOSE_SEARCH,
    ORDER_LIST
} from './types';

export const getUserRepositoriesAction = (userGithub) => {
    return (dispatch) => {
      const URL = `https://api.github.com/users/${userGithub}/repos`;
      fetch(`${URL}`)
      .then(response => response.json())
        .then(data => {
          dispatch({
            type: GET_USER_REPOS,
            payload: data,
          });
        });
    };
};

export const filterFetchReposAction = (text) => {
  return (dispatch) => {
      dispatch({ type: SEARCH_REPOS, payload: text });
  };
};

export const closeSearchAction = () => {
  return (dispatch) => {
      dispatch({ type: CLOSE_SEARCH });
  };
};

export const orderByListAction = (index) => {
  return (dispatch) => {
      dispatch({ type: ORDER_LIST, payload: index });
  };
};
