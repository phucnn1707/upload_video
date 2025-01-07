import {
  FETCH_API_KEY_REQUEST,
  FETCH_API_KEY_SUCCESS,
  FETCH_API_KEY_FAILURE,
  UPDATE_API_KEY_REQUEST,
  UPDATE_API_KEY_SUCCESS,
  UPDATE_API_KEY_FAILURE,
} from '../types';
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

export const updateApiKeyByServiceName = (serviceName, apiKey) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_API_KEY_REQUEST });

    const response = await apiClient.put(`/apikeys/${serviceName}`, { apiKey });

    dispatch({
      type: UPDATE_API_KEY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_API_KEY_FAILURE,
      payload: error.response?.data?.message || 'Failed to update API Key',
    });
  }
};

export const createApiKeyByServiceName = (serviceName, apiKey) => async (dispatch) => {
  dispatch({ type: FETCH_API_KEY_REQUEST });
  try {
    const response = await apiClient.post('/apikeys', {
      service_name: serviceName,
      api_key: apiKey,
    });
    dispatch({
      type: FETCH_API_KEY_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_API_KEY_FAILURE,
      payload: error.message || `API key creation failed for ${serviceName}`,
    });
  }
};
