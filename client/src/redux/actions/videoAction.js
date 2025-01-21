import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAILURE,
  MERGE_VIDEO_REQUEST,
  MERGE_VIDEO_SUCCESS,
  MERGE_VIDEO_FAILURE,
} from '../types';
import apiClient from '../../services/axiosConfig';

export const fetchVideos = () => async (dispatch) => {
  dispatch({ type: FETCH_VIDEOS_REQUEST });
  try {
    const response = await apiClient.get('/videos');
    dispatch({ type: FETCH_VIDEOS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_VIDEOS_FAILURE, payload: error.message });
  }
};

// Upload Video
export const uploadVideo = (videoId) => async (dispatch) => {
  dispatch({ type: UPLOAD_VIDEO_REQUEST, payload: { videoId } });
  try {
    const response = await apiClient.post(`/youtube/upload/${videoId}`);

    dispatch({
      type: UPLOAD_VIDEO_SUCCESS,
      payload: { videoId, data: response.data },
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_VIDEO_FAILURE,
      payload: {
        videoId,
        error: error.response?.data?.message || error.message || 'Failed to upload video',
      },
    });
  }
};

export const mergeVideo = (videoId, videoPath, srtPath, textScriptId) => async (dispatch) => {
  dispatch({ type: MERGE_VIDEO_REQUEST, payload: { videoId } });
  try {
    const response = await apiClient.post(`/generate/merge-video/${videoId}`, {
      videoPath,
      srtPath,
      textScriptId,
    });
    dispatch({
      type: MERGE_VIDEO_SUCCESS,
      payload: { videoId, ...response.data },
    });
  } catch (error) {
    dispatch({
      type: MERGE_VIDEO_FAILURE,
      payload: { videoId, error: error.response?.data?.message || error.message },
    });
  }
};
