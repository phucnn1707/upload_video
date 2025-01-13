import {
  FETCH_TEXTSCRIPTS_REQUEST,
  FETCH_TEXTSCRIPTS_SUCCESS,
  FETCH_TEXTSCRIPTS_FAILURE,
  CREATE_TEXTSCRIPT_REQUEST,
  CREATE_TEXTSCRIPT_SUCCESS,
  CREATE_TEXTSCRIPT_FAILURE,
  UPDATE_TEXTSCRIPT_REQUEST,
  UPDATE_TEXTSCRIPT_SUCCESS,
  UPDATE_TEXTSCRIPT_FAILURE,
} from '../types.js';

const initialState = {
  loading: false,
  textScripts: [],
  error: null,
  newScript: null,
};

const textScriptReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEXTSCRIPTS_REQUEST:
    case CREATE_TEXTSCRIPT_REQUEST:
    case UPDATE_TEXTSCRIPT_REQUEST:
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

    case CREATE_TEXTSCRIPT_SUCCESS:
      return {
        ...state,
        loading: false,
        newScript: action.payload,
        textScripts: [action.payload, ...state.textScripts],
      };

    case UPDATE_TEXTSCRIPT_SUCCESS:
      return {
        ...state,
        loading: false,
        textScripts: state.textScripts.map((script) =>
          script.script_id === action.payload.script_id ? { ...script, ...action.payload } : script
        ),
      };

    case FETCH_TEXTSCRIPTS_FAILURE:
    case CREATE_TEXTSCRIPT_FAILURE:
    case UPDATE_TEXTSCRIPT_FAILURE:
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
