import { FETCH_LINKED_ACCOUNTS_REQUEST, FETCH_LINKED_ACCOUNTS_SUCCESS, FETCH_LINKED_ACCOUNTS_FAILURE } from '../types';
import apiClient from '../../services/axiosConfig';

// Action to fetch linked accounts
export const fetchLinkedAccounts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_LINKED_ACCOUNTS_REQUEST });

    const response = await apiClient.get('/linked-accounts');

    // Validate that the response is an array
    const accounts = Array.isArray(response.data.data) ? response.data.data : [];
    dispatch({
      type: FETCH_LINKED_ACCOUNTS_SUCCESS,
      payload: accounts,
    });
  } catch (error) {
    dispatch({
      type: FETCH_LINKED_ACCOUNTS_FAILURE,
      payload: error.response?.data?.error || 'Failed to fetch linked accounts.',
    });
  }
};
