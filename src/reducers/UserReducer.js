import {
  USERS_FETCH_SUCCESS,
  SIGN_USER,
  INFO_UPDATE,
  SAVE_NEW_USER,
  CLEAR_INPUTS
} from '../actions/types.js';

const INITIAL_STATE = {
  username: '',
  password: '',
  name: '',
  lastname: '',
  email: '',
  identification: '',
  birthdate: '',
  userGithub: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INFO_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case SIGN_USER:
      return { ...state, username: '', password: '', signInResult: action.payload };
    case SAVE_NEW_USER:
      return { ...state,
        name: '',
        lastname: '',
        email: '',
        identification: '',
        birthdate: '',
        userGithub: ''
      };
    case USERS_FETCH_SUCCESS: {
      const listUsers = action.payload === null ? [] : action.payload;
      const validate = action.payload === null;
      return { ...state, listUsers, validate };
    }
    case CLEAR_INPUTS:
      return { ...state,
        name: '',
        lastname: '',
        email: '',
        identification: '',
        birthdate: '',
        userGithub: ''
      };
    default:
      return state;
    }
};
