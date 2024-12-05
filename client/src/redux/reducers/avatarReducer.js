import { FETCH_AVATARS_FAILURE, FETCH_AVATARS_REQUEST, FETCH_AVATARS_SUCCESS } from '../types';

const initialState = {
  loading: false,
  avatars: [],
  error: null,
};

export const avatarReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AVATARS_REQUEST:
      return { ...state, loading: true };
    case FETCH_AVATARS_SUCCESS:
      return { ...state, loading: false, avatars: action.payload, error: null };
    case FETCH_AVATARS_FAILURE:
      return { ...state, loading: false, avatars: [], error: action.payload };
    default:
      return state;
  }
};
