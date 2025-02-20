import apiClient from '../../services/axiosConfig.js';
import {
  FETCH_TEXTSCRIPTS_REQUEST,
  FETCH_TEXTSCRIPTS_SUCCESS,
  FETCH_TEXTSCRIPTS_FAILURE,
  CREATE_TEXTSCRIPT_REQUEST,
  CREATE_TEXTSCRIPT_SUCCESS,
  CREATE_TEXTSCRIPT_FAILURE,
  UPDATE_TEXTSCRIPT_REQUEST,
  UPDATE_TEXTSCRIPT_SUCCESS,
  UPDATE_TEXTSCRIPT_FAILURE,
} from '../types.js';

// Fetch Text Scripts Action
export const fetchTextScripts = () => async (dispatch) => {
  dispatch({ type: FETCH_TEXTSCRIPTS_REQUEST });
  try {
    const response = await apiClient.get('/text-scripts');
    dispatch({
      type: FETCH_TEXTSCRIPTS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TEXTSCRIPTS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Create Text Script Action
export const createTextScript = (textScriptData) => async (dispatch) => {
  dispatch({ type: CREATE_TEXTSCRIPT_REQUEST });
  try {
    const response = await apiClient.post('/text-scripts', textScriptData);
    dispatch({
      type: CREATE_TEXTSCRIPT_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_TEXTSCRIPT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update Text Script Action
export const updateTextScript = (id, updatedData) => async (dispatch) => {
  dispatch({ type: UPDATE_TEXTSCRIPT_REQUEST });
  try {
    const response = await apiClient.put(`/text-scripts/${id}`, updatedData);
    dispatch({
      type: UPDATE_TEXTSCRIPT_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TEXTSCRIPT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
