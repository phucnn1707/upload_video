import axios from 'axios';
import { FETCH_VIDEOS_REQUEST, FETCH_VIDEOS_SUCCESS, FETCH_VIDEOS_FAILURE } from '../types';
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
