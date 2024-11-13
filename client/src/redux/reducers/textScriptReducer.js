// redux/reducers/textScriptReducer.js
import { FETCH_TEXTSCRIPTS_REQUEST, FETCH_TEXTSCRIPTS_SUCCESS, FETCH_TEXTSCRIPTS_FAILURE } from '../types.js';

const initialState = {
  loading: false,
  textScripts: [],
  error: null,
};

const textScriptReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEXTSCRIPTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TEXTSCRIPTS_SUCCESS:
      return {
        ...state,
        loading: false,
        textScripts: action.payload,
      };
    case FETCH_TEXTSCRIPTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default textScriptReducer;
