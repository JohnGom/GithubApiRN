import _ from 'lodash';
import {
    GET_USER_REPOS,
    SEARCH_REPOS,
    CLOSE_SEARCH,
    ORDER_LIST
  } from '../actions/types.js';

  const INITIAL_STATE = {
    listRepos: []
  };

  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_USER_REPOS: {
        return { ...state, listRepos: action.payload, backupRepos: action.payload };
      }
      case SEARCH_REPOS: {
        const textSearch = action.payload.toUpperCase();
        const listFiltered = _.filter(state.backupRepos,
          (data) => data.name.toUpperCase().search(textSearch) >= 0);
        return { ...state, listRepos: listFiltered };
      }
      case CLOSE_SEARCH: {
        return { ...state, listRepos: state.backupRepos };
      }
      case ORDER_LIST: {
        const index = action.payload;
        const listOrdered = _.sortBy(state.backupRepos, (info) => { return info[index]; });
        return { ...state, listRepos: listOrdered };
      }
      default:
        return state;
      }
  };
