import apiClient from '../../services/axiosConfig';
import { FETCH_AVATARS_FAILURE, FETCH_AVATARS_REQUEST, FETCH_AVATARS_SUCCESS } from '../types';

export const fetchAvatars = () => async (dispatch) => {
  dispatch({ type: FETCH_AVATARS_REQUEST });
  try {
    const response = await apiClient.get('/avatars');
    dispatch({ type: FETCH_AVATARS_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: FETCH_AVATARS_FAILURE, payload: error.message });
  }
};
