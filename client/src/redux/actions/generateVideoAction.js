import { GENERATE_VIDEO_REQUEST, GENERATE_VIDEO_SUCCESS, GENERATE_VIDEO_FAILURE } from '../types';
import apiClient from '../../services/axiosConfig';

export const generateVideo = (textScriptId, avatarUrl, voice_id, type) => async (dispatch) => {
  dispatch({ type: GENERATE_VIDEO_REQUEST });
  try {
    const response = await apiClient.post('/generate/video', { textScriptId, avatarUrl, voice_id, type });
    dispatch({ type: GENERATE_VIDEO_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GENERATE_VIDEO_FAILURE, payload: error.message });
  }
};
