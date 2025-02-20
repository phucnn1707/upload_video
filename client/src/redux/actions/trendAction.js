import apiClient from '../../services/axiosConfig';
import { FETCH_TRENDS_FAILURE, FETCH_TRENDS_REQUEST, FETCH_TRENDS_SUCCESS } from '../types';

export const fetchTrendsRequest = () => ({
  type: FETCH_TRENDS_REQUEST,
});

export const fetchTrendsSuccess = (trends) => ({
  type: FETCH_TRENDS_SUCCESS,
  payload: trends,
});

export const fetchTrendsFailure = (error) => ({
  type: FETCH_TRENDS_FAILURE,
  payload: error,
});

export const fetchTrends = () => async (dispatch) => {
  dispatch(fetchTrendsRequest());
  try {
    const response = await apiClient.get('/keywords');
    dispatch(fetchTrendsSuccess(response.data));
  } catch (error) {
    dispatch(fetchTrendsFailure(error.message));
  }
};
