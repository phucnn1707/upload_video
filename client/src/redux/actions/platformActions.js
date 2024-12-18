import {
  LINK_PLATFORM_REQUEST,
  LINK_PLATFORM_SUCCESS,
  LINK_PLATFORM_FAILURE,
  REVOKE_PLATFORM_REQUEST,
  REVOKE_PLATFORM_SUCCESS,
  REVOKE_PLATFORM_FAILURE,
} from '../types';
import apiClient from '../../services/axiosConfig';

// Link Platform Account
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

// Revoke Platform Account
export const revokePlatformAccount = (platform) => async (dispatch) => {
  try {
    // Dispatch revoke request action
    dispatch({ type: REVOKE_PLATFORM_REQUEST, payload: { platform } });

    // Call the API to revoke the token
    await apiClient.post(`/linked-accounts/${platform}/revoke-token`);

    // Dispatch revoke success action
    dispatch({ type: REVOKE_PLATFORM_SUCCESS, payload: { platform } });
  } catch (error) {
    // Dispatch revoke failure action
    dispatch({
      type: REVOKE_PLATFORM_FAILURE,
      payload: {
        platform,
        error: error.response?.data?.error || 'Failed to revoke account link',
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
