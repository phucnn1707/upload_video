import apiClient from '../../services/axiosConfig';
import {
  FETCH_SUBTITLE_REQUEST,
  FETCH_SUBTITLE_SUCCESS,
  FETCH_SUBTITLE_FAILURE,
  SAVE_SUBTITLE_REQUEST,
  SAVE_SUBTITLE_SUCCESS,
  SAVE_SUBTITLE_FAILURE,
} from '../types';

const URL = import.meta.env.VITE_VIDEO_URL;

export const fetchSubtitle = (subTitleURL) => async (dispatch) => {
  dispatch({ type: FETCH_SUBTITLE_REQUEST });
  try {
    const response = await apiClient.get(`subtitle?url=${URL}${subTitleURL}`);
    dispatch({ type: FETCH_SUBTITLE_SUCCESS, payload: response.data.content });
    return response.data.content;
  } catch (error) {
    dispatch({ type: FETCH_SUBTITLE_FAILURE, error: error.message });
  }
};

export const saveSubtitle = (subTitleURL, subtitle) => async (dispatch) => {
  dispatch({ type: SAVE_SUBTITLE_REQUEST });
  try {
    const response = await apiClient.post(`subtitle?filePath=${subTitleURL}`, { content: subtitle });

    if (!response.data?.success) throw new Error('Failed to save subtitle');
    dispatch({ type: SAVE_SUBTITLE_SUCCESS });
  } catch (error) {
    dispatch({ type: SAVE_SUBTITLE_FAILURE, error: error.message });
  }
};

export const clearSubtitle = () => ({
  type: 'CLEAR_SUBTITLE',
});

export const markToastAsShown = () => ({
  type: 'TOAST_SHOWN',
});
