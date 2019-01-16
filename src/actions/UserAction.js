import firebase from 'firebase';
import { Toast } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import {
    INFO_UPDATE,
    USERS_FETCH_SUCCESS,
    SIGN_USER,
    SAVE_NEW_USER,
    CLEAR_INPUTS
} from './types';

export const UpdateInfoAction = ({ prop, value }) => {
    return {
        type: INFO_UPDATE,
        payload: { prop, value }
    };
};

export const SignInAction = ({ username, password }) => {
    const email = `${username}@pruebas4n.com`;
    return (dispatch) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        Actions.users({ type: ActionConst.RESET });
        dispatch({
          type: SIGN_USER,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/user-not-found') {
          Toast.show({
            text: 'Usuario no encontrado',
            type: 'danger',
          });
        } else if (errorCode === 'auth/wrong-password') {
          Toast.show({
            text: 'Contraseña incorrecta',
            type: 'danger',
          });
        }
        dispatch({
          type: SIGN_USER,
          payload: false,
        });
      });
    };
  };

export const UsersFetchAction = () => {
    return (dispatch) => {
      firebase.database().ref('/usersGithub/')
        .on('value', snapshot => {
          dispatch({ type: USERS_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
};

export const newUserAction = ({
    name, lastname, email, identification, birthdate, userGithub, avatarUrl, url, repos
}) => {
    return (dispatch) => {
        firebase.database().ref('/usersGithub/')
        .push({ name, lastname, email, identification, birthdate, userGithub, avatarUrl, url, repos })
        .then(() => {
        Actions.pop();
          dispatch({ type: SAVE_NEW_USER });
        });
    };
};

export const clearInputsAction = () => {
    return (dispatch) => {
      dispatch({ type: CLEAR_INPUTS });
    };
};
