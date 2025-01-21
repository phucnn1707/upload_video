import {
  FETCH_SUBTITLE_REQUEST,
  FETCH_SUBTITLE_SUCCESS,
  FETCH_SUBTITLE_FAILURE,
  SAVE_SUBTITLE_REQUEST,
  SAVE_SUBTITLE_SUCCESS,
  SAVE_SUBTITLE_FAILURE,
} from '../types';

const initialState = {
  subtitle: '',
  loading: false,
  error: null,
  saveSuccess: false,
};

const subtitleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBTITLE_REQUEST:
      return { ...state, loading: true, error: null, saveSuccess: false };
    case FETCH_SUBTITLE_SUCCESS:
      return { ...state, loading: false, subtitle: action.payload };
    case FETCH_SUBTITLE_FAILURE:
      return { ...state, loading: false, error: action.error };

    case SAVE_SUBTITLE_REQUEST:
      return { ...state, loading: true, error: null, saveSuccess: false };
    case SAVE_SUBTITLE_SUCCESS:
      return { ...state, loading: false, saveSuccess: true };
    case SAVE_SUBTITLE_FAILURE:
      return { ...state, loading: false, error: action.error };

    case 'CLEAR_SUBTITLE':
      return initialState;

    default:
      return state;
  }
};

export default subtitleReducer;
