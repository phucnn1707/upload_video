import { GENERATE_TEXT_REQUEST, GENERATE_TEXT_SUCCESS, GENERATE_TEXT_FAILURE } from '../types';

const initialState = {
  generatedTitle: '',
  generatedText: '',
  loading: false,
  error: null,
};

const generateScriptReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_TEXT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GENERATE_TEXT_SUCCESS:
      return {
        ...state,
        loading: false,
        generatedTitle: action.payload.data.generatedTitle,
        generatedText: action.payload.data.generatedText,
      };
    case GENERATE_TEXT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default generateScriptReducer;
