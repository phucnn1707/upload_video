// src/redux/actions/trendActions.js

import { GET_TREND_REQUEST, GET_TREND_SUCCESS, GET_TREND_FAILURE } from '../types';
import apiClient from '../../services/axiosConfig';

export const getTrend = () => async (dispatch) => {
  dispatch({ type: GET_TREND_REQUEST });

  try {
    const response = await apiClient.get('/trends');

    dispatch({
      type: GET_TREND_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TREND_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
