import apiClient from '../../services/axiosConfig';
import { GENERATE_TEXT_FAILURE, GENERATE_TEXT_REQUEST, GENERATE_TEXT_SUCCESS, RESET_GENERATE_SCRIPT } from '../types';

export const generateScript =
  (keyword, options = {}) =>
  async (dispatch) => {
    dispatch({ type: GENERATE_TEXT_REQUEST });

    try {
      const payload = { keyword, options };

      console.log(payload);

      const response = await apiClient.post('/generate/text', payload);

      dispatch({
        type: GENERATE_TEXT_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch({
        type: GENERATE_TEXT_FAILURE,
        payload: error.response?.data?.message || 'Error generating text',
      });
      return Promise.reject(error);
    }
  };

export const resetGenerateScript = () => {
  return {
    type: RESET_GENERATE_SCRIPT,
  };
};
