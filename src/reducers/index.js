import { combineReducers } from 'redux';
import UserReducer from './UserReducer.js';
import GithubApiReducer from './GithubApiReducer.js';

const reducers = combineReducers({
  user: UserReducer,
  github: GithubApiReducer
});

export default reducers;
