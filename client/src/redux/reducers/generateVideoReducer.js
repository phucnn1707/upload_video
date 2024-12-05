import { GENERATE_VIDEO_REQUEST, GENERATE_VIDEO_SUCCESS, GENERATE_VIDEO_FAILURE } from '../types';

const initialState = {
  generating: false,
  generatedVideo: null,
  generateError: null,
};

const generateVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_VIDEO_REQUEST:
      return { ...state, generating: true, generateError: null, generatedVideo: null };
    case GENERATE_VIDEO_SUCCESS:
      return { ...state, generating: false, generatedVideo: action.payload };
    case GENERATE_VIDEO_FAILURE:
      return { ...state, generating: false, generateError: action.payload };
    default:
      return state;
  }
};

export default generateVideoReducer;
