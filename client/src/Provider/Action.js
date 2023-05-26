import * as types from "./ActionTypes";

export const LoginSuccess = (data) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: data,
  };
};

export const LogoutSuccess = () => {
  return {
    type: types.LOGOUT_SUCCESS,
  };
};
