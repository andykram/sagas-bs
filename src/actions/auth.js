export const SIGN_UP = 'auth/signUp';
export const signUp = (login, password) => ({
  type: SIGN_UP,
  payload: { login, password },
});

export const SIGN_UP_SUCCESSFUL = 'auth/signUpSuccessful';
export const signUpSuccessful = () => ({
  type: SIGN_UP_SUCCESSFUL,
});

export const SIGN_UP_FAILED = 'auth/signUpFailed';
export const signUpFailed = error => ({
  type: SIGN_UP_FAILED,
  error,
});

export const LOG_IN = 'login/login';
export const logIn = (login, password) => ({
  type: LOG_IN,
  payload: { login, password },
});

export const LOG_IN_SUCCESSFUL = 'login/loginSuccessful';
export const loginSuccessful = () => ({
  type: LOG_IN_SUCCESSFUL,
});

export const LOG_IN_FAILED = 'login/loginFailed';
export const loginFailed = error => ({
  type: LOG_IN_FAILED,
  error,
});

export const LOG_OUT = 'logout/logout';
export const logOut = () => ({
  type: LOG_OUT,
});
