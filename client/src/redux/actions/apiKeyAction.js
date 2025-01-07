import { FETCH_API_KEY_REQUEST, FETCH_API_KEY_SUCCESS, FETCH_API_KEY_FAILURE } from '../types';
import apiClient from '../../services/axiosConfig';

export const fetchApiKeyByServiceName = (serviceName) => async (dispatch) => {
  dispatch({ type: FETCH_API_KEY_REQUEST });
  try {
    const response = await apiClient.get(`/apikeys/${serviceName}`);
    dispatch({
      type: FETCH_API_KEY_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_API_KEY_FAILURE,
      payload: error.message || `API key for ${serviceName} fetch failed`,
    });
  }
};
