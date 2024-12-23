import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAILURE,
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
    const response = await apiClient.post(
      `/youtube/upload/${videoId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your auth mechanism
        },
      }
    );

    dispatch({
      type: UPLOAD_VIDEO_SUCCESS,
      payload: { videoId, data: response.data },
    });

    alert('Video uploaded successfully!');
  } catch (error) {
    dispatch({
      type: UPLOAD_VIDEO_FAILURE,
      payload: {
        videoId,
        error: error.response?.data?.message || error.message || 'Failed to upload video',
      },
    });

    alert('Failed to upload video. Please try again.');
  }
};
