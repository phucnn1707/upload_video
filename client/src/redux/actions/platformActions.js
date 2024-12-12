// src/redux/actions/platformActions.js
import { LINK_PLATFORM_REQUEST, LINK_PLATFORM_SUCCESS, LINK_PLATFORM_FAILURE } from '../types';
import apiClient from '../../services/axiosConfig';

export const linkPlatformAccount = (platform) => async (dispatch) => {
  try {
    // Dispatch request action
    dispatch({ type: LINK_PLATFORM_REQUEST, payload: { platform } });

    // Fetch the authorization URL
    const response = await apiClient.get(`/linked-accounts/${platform}/get-auth-url`);
    const { url } = response.data;

    // Redirect the user to the authorization URL
    window.location.href = url;
  } catch (error) {
    // Dispatch failure action
    dispatch({
      type: LINK_PLATFORM_FAILURE,
      payload: {
        platform,
        error: error.response?.data?.error || 'Failed to fetch authorization URL',
      },
    });
  }
};

// Handle OAuth success
export const handleOAuthSuccess = (platform, userPlatformId) => (dispatch) => {
  dispatch({
    type: LINK_PLATFORM_SUCCESS,
    payload: { platform, userPlatformId },
  });
};

// Handle OAuth failure
export const handleOAuthFailure = (platform, error) => (dispatch) => {
  dispatch({
    type: LINK_PLATFORM_FAILURE,
    payload: { platform, error },
  });
};
