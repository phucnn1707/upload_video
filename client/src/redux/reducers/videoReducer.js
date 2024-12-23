import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAILURE,
} from '../types';

const initialState = {
  loading: false,
  data: [],
  error: null,
  uploads: {},
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_VIDEOS_SUCCESS:
      return { ...state, loading: false, data: action.payload.data };
    case FETCH_VIDEOS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Upload video
    case UPLOAD_VIDEO_REQUEST:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          [action.payload.videoId]: { loading: true, success: false, error: null },
        },
      };
    case UPLOAD_VIDEO_SUCCESS:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          [action.payload.videoId]: { loading: false, success: true, error: null },
        },
      };
    case UPLOAD_VIDEO_FAILURE:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          [action.payload.videoId]: {
            loading: false,
            success: false,
            error: action.payload.error,
          },
        },
      };

    default:
      return state;
  }
};

export default videoReducer;
