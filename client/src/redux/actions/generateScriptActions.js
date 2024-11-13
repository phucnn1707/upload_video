import apiClient from '../../services/axiosConfig';
import { GENERATE_TEXT_FAILURE, GENERATE_TEXT_REQUEST, GENERATE_TEXT_SUCCESS } from '../types';

export const generateScript = (keyword) => async (dispatch) => {
  dispatch({ type: GENERATE_TEXT_REQUEST });
  try {
    const response = await apiClient.post('/generate-text', { keyword });
    console.log(response);
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
