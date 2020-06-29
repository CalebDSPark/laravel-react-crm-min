import axios from '../utils/axios';
import authService from '../services/authService';

export const LOGIN_REQUEST = '@account/login-request';
export const LOGIN_SUCCESS = '@account/login-success';
export const LOGIN_FAILURE = '@account/login-failure';
export const SILENT_LOGIN = '@account/silent-login';
export const LOGOUT = '@account/logout';
export const REGISTER = '@account/register';
export const UPDATE_PROFILE = '@account/update-profile';

export function login(username, password) {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });

      //const user = await authService.login(username, password);
      // [for Demo]
      const user = {id: 1, first_name: "Caleb", last_name: "Park", email: "cp@calebpark.com", phone: "604-123-4567"};

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user
        }
      });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE });
      throw error;
    }
  };
}

export function setUserData(user) {
  return (dispatch) => dispatch({
    type: SILENT_LOGIN,
    payload: {
      user
    }
  });
}

export function logout() {
  return async (dispatch) => {
    authService.logout();

    dispatch({
      type: LOGOUT
    });
  };
}

export function register() {
  return true;
}

export function updateProfile(update) {        
    authService.setTokenToHeader();
    const request = axios.post('/api/auth/update', { update });   

    return async (dispatch) => {        
      await request 
      .then((response) => {        
        dispatch({          
          type: UPDATE_PROFILE,
          payload: {user: update}          
        })
      })      
    };    
}
