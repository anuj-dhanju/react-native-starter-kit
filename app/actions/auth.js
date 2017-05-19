import { callApi,
       } from '../utils/apiUtils';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';
export const LOGOUT = 'LOGOUT';

function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

function loginSuccess(response) {
  const idToken = response.data.auth_token;
  const user = response.data.user;
  return {
    type: LOGIN_SUCCESS,
    user: user,
  };
}

function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error: error,
  };
}

function forgotPasswordRequest() {
  return {
    type: FORGOT_PASSWORD_REQUEST,
  };
}

function forgotPasswordSuccess(response) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
  };
}

function forgotPasswordFailure(error) {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    error: error,
  };
}

function resetPasswordRequest() {
  return {
    type: RESET_PASSWORD_REQUEST,
  };
}

function resetPasswordSuccess() {
  return {
    type: RESET_PASSWORD_SUCCESS,
  };
}

function resetPasswordFailure(error) {
  return {
    type: RESET_PASSWORD_FAILURE,
    error: error,
  };
}

export function login(data) {
  const config = {
    method: 'post',    
    body: JSON.stringify(data),
  };
  return callApi('/v1/sessions', {}, config, loginRequest, loginSuccess, loginFailure);
}

export function logout() {
  return {
    type: LOGOUT,
    user: null,
  };
}

export function forgotPassword(data) {
  const config = {
    method: 'post',
    body: JSON.stringify(data),
  };
  return callApi('/v1/passwords', {}, config, forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFailure);
}

export function resetPassword(data) {
  const id = data.id;
  const config = {
    method: 'put',    
    body: JSON.stringify(data),
  };
  return callApi('/v1/passwords/'+id, {}, config, resetPasswordRequest, resetPasswordSuccess, resetPasswordFailure);
}

export function currentUserLoad() {
  const config = {
    method: 'get',    
  };
  return callApi('/v1/users/profile', {}, config, loginRequest, loginSuccess, loginFailure);
}