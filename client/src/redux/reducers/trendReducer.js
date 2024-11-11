import { FETCH_TRENDS_FAILURE, FETCH_TRENDS_REQUEST, FETCH_TRENDS_SUCCESS } from '../types';

const initialState = {
  loading: false,
  trends: [],
  error: '',
};

const trendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRENDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TRENDS_SUCCESS:
      return {
        loading: false,
        trends: action.payload,
        error: '',
      };
    case FETCH_TRENDS_FAILURE:
      return {
        loading: false,
        trends: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default trendsReducer;
