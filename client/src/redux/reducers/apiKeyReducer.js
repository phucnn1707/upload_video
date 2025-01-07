import { FETCH_API_KEY_REQUEST, FETCH_API_KEY_SUCCESS, FETCH_API_KEY_FAILURE } from '../types';

const initialState = {
  searchApiKey: null,
  loading: false,
  error: null,
};

const apiKeyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_API_KEY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_API_KEY_SUCCESS:
      return {
        ...state,
        loading: false,
        searchApiKey: action.payload.api_key,
      };
    case FETCH_API_KEY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default apiKeyReducer;
