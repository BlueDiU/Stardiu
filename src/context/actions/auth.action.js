import { api_enpoint, helpHttp } from '../../helpers';
import { TYPES } from '../types/types';

import { toast } from 'react-toastify';

// instance for http helper
const api = helpHttp();

/* ----- AUTH SECTION ----- */

/**
  action when the user log in
  @param {string} email user email
  @param {string} password user password
*/
export const startLoginWithEmailPassword = (email, password) => {
  return async (dispatch) => {
    try {
      let data = {
        body: { email, password },
        headers: { 'content-type': 'application/json' },
      };

      const res = await api.post(api_enpoint.login, data);

      if (!res.err) {
        const { user } = res;
        localStorage.setItem('star-token', res.token);
        return dispatch(
          authAction({
            uid: user.uid,
            name: user.name,
            img: user.img,
            role: user.role,
          })
        );
      } else {
        return toast.error('Correo o contraseña incorrecto', {
          hideProgressBar: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error(error.msg);
    }
  };
};

/**
 * action for register a new user
 * @param {string} name
 * @param {string} email
 * @param {string} password
 */
export const startRegisterWithEmailPasswordName = (
  name,
  email,
  password
) => {
  return async (dispatch) => {
    try {
      let data = {
        body: {
          name,
          email,
          password,
          role: 'USER_ROLE',
          google: false,
        },
        headers: { 'content-type': 'application/json' },
      };

      const res = await api.post(api_enpoint.createUser, data);

      if (!res.err) {
        const { uid, name, img, role } = res;
        localStorage.setItem('star-token', res.token);

        toast.success('Ya estás registrado 🎉');

        return dispatch(authAction({ uid, name, img, role }));
      } else {
        dispatch(checkingFinish());

        return toast.error(
          'Ese correo ya esta tomado, por favor intenta con otro'
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
};

/* ----- GOOGLE SIGN IN SECTION ----- */

/**
 * Google Sign In action
 * @param {string} token
 */
export const startLoginWithGoogle = (token) => {
  return async (dispatch) => {
    try {
      const data = {
        body: {
          id_token: token,
        },
        headers: { 'content-type': 'application/json' },
      };

      const res = await api.post(
        api_enpoint.loginWithGoogle,
        data
      );

      if (!res.err) {
        const { uid, name, img, role } = res.user;
        localStorage.setItem('star-token', res.token);

        return dispatch(authAction({ uid, name, img, role }));
      } else {
        dispatch(checkingFinish());

        return toast.error(
          'La autenticación fallo, por favor intenta de nuevo'
        );
      }
    } catch (err) {
      return toast.error('google auth failed');
    }
  };
};

/* ----- VALIDATE JWT SECTION ----- */

/**
 * action for renew the previous token and create a new token for the user section
 */
export const startCheckingRenewToken = () => {
  return async (dispatch) => {
    try {
      // read the previous token from local storage
      const token = localStorage.getItem('star-token') || '';
      const data = {
        headers: {
          'content-type': 'application/json',
          'x-token': token,
        },
      };
      const body = await api.get(api_enpoint.renew, data);

      if (body.ok) {
        const { uid, name, img, role } = body;
        localStorage.setItem('star-token', body.token);

        return dispatch(authAction({ uid, name, img, role }));
      } else {
        return dispatch(checkingFinish());
      }
    } catch (error) {
      dispatch(checkingFinish());
      console.error(error);
    }
  };
};

/**
 * verified if there is authenticated user
 * @return { boolean }
 */
const checkingFinish = (checking = true) => ({
  type: TYPES.AUTH_CHECKING,
  payload: checking,
});

/**
 * Action for login and sign in
 * @param {{uid: string, name: string}} user
 * @returns {object}
 */
const authAction = (user) => ({
  type: TYPES.AUTH_LOGIN,
  payload: user,
});

/* ----- LOG OUT SECTION ----- */

/***
  log out and clean localStorage
*/
export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({
  type: TYPES.AUTH_LOGOUT,
});
