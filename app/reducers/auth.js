import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  LOGOUT,
} from '../actions/auth';

const initialState = {
  loggingIn: false,
  loggingOut: false,
  loginError: null,
};

function initializeState(){
  return Object.assign({}, initialState);
}

export default function auth(state = initializeState(), action = {}) {
  switch (action.type) {
  case LOGIN_REQUEST:
    return Object.assign({}, state, {loggingIn: true});
  case LOGIN_SUCCESS:
    return Object.assign({}, state, {
      loggingIn: false,
      user: action.user,
    });
  case LOGIN_FAILURE:
    return {
      ...state,
      loggingIn: false,
      user: null,
      loginError: action.error
    };
  
  case LOGOUT:
    return {
      ...state,
      loggingOut: false,
      user: null,
      loginError: null
    };
  case FORGOT_PASSWORD_REQUEST:
    return Object.assign({}, state, {
      forgotPasswordConfirmationSent: false,
    });
  case FORGOT_PASSWORD_SUCCESS:
    return {
      ...state,
      forgotPasswordConfirmationSent: true,
      forgotPasswordEmail: null,
    };
  
  case FORGOT_PASSWORD_FAILURE:
    return {
      ...state,
      loginError: action.error
    };
  case RESET_PASSWORD_REQUEST:
    return Object.assign({}, state, {
      resetPasswordSuccess: false,
    });
  case RESET_PASSWORD_SUCCESS:
    return {
      ...state,
      resetPasswordSuccess: true,
    };
  
  case RESET_PASSWORD_FAILURE:
    return {
      ...state,
      resetPasswordSuccess: false,
    };
  default:
    return state;
  }
}
