import { FETCH_VIDEOS_REQUEST, FETCH_VIDEOS_SUCCESS, FETCH_VIDEOS_FAILURE } from '../types';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_VIDEOS_SUCCESS:
      return { ...state, loading: false, data: action.payload.data };
    case FETCH_VIDEOS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default videoReducer;
