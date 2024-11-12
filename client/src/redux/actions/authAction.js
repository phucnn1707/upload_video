import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../types';
import axios from 'axios';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: typeof error === 'string' ? error : error.message || 'Login failed',
});

export const login = (id, password, navigate) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', { email: id, password: password });
      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/create-script');
        dispatch(loginSuccess(response.data));
      } else {
        dispatch(loginFailure(response.data.message));
      }
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    }
  };
};
