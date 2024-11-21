import apiClient from '../../services/axiosConfig';
import { GENERATE_TEXT_FAILURE, GENERATE_TEXT_REQUEST, GENERATE_TEXT_SUCCESS, RESET_GENERATE_SCRIPT } from '../types';

export const generateScript = (keyword) => async (dispatch) => {
  dispatch({ type: GENERATE_TEXT_REQUEST });
  try {
    const response = await apiClient.post('/generate-text', { keyword });
    dispatch({
      type: GENERATE_TEXT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GENERATE_TEXT_FAILURE,
      payload: error.response?.data?.message || 'Error generating text',
    });
  }
};

export const resetGenerateScript = () => {
  return {
    type: RESET_GENERATE_SCRIPT,
  };
};
