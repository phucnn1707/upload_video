import axios from 'axios';
import { GENERATE_TEXT_FAILURE, GENERATE_TEXT_REQUEST, GENERATE_TEXT_SUCCESS } from '../types';

// Action gọi API và dispatch các trạng thái
export const generateText = (keyword) => async (dispatch) => {
  dispatch({ type: GENERATE_TEXT_REQUEST });
  try {
    const response = await axios.post('http://localhost:3000/api/v1/generate-text', { keyword });
    dispatch({
      type: GENERATE_TEXT_SUCCESS,
      payload: response.data.generatedText,
    });
  } catch (error) {
    dispatch({
      type: GENERATE_TEXT_FAILURE,
      payload: error.response?.data?.message || 'Error generating text',
    });
  }
};
