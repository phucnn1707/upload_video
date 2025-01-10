// src/redux/reducers/trendReducer.js

import { GET_TREND_REQUEST, GET_TREND_SUCCESS, GET_TREND_FAILURE } from '../types';

const initialState = {
  loading: false,
  googleTrends: [],
  youtubeTrends: [],
  error: null,
};

const apiTrendReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TREND_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_TREND_SUCCESS:
      return {
        ...state,
        loading: false,
        googleTrends: action.payload.googleTrends,
        youtubeTrends: action.payload.youtubeTrends,
      };
    case GET_TREND_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default apiTrendReducer;
