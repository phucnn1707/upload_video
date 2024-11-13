// redux/actions/textScriptActions.js
import apiClient from '../../services/axiosConfig';
import { FETCH_TEXTSCRIPTS_REQUEST, FETCH_TEXTSCRIPTS_SUCCESS, FETCH_TEXTSCRIPTS_FAILURE } from '../types.js';

export const fetchTextScripts = () => async (dispatch) => {
  dispatch({ type: FETCH_TEXTSCRIPTS_REQUEST });
  try {
    const response = await apiClient.get('/textscripts');
    dispatch({
      type: FETCH_TEXTSCRIPTS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TEXTSCRIPTS_FAILURE,
      payload: error.message,
    });
  }
};
