// src/redux/reducers/platformReducer.js
import { LINK_PLATFORM_REQUEST, LINK_PLATFORM_SUCCESS, LINK_PLATFORM_FAILURE } from '../types';

const initialState = {
  youtube: { loading: false, success: false, error: null, userPlatformId: null },
  tiktok: { loading: false, success: false, error: null, userPlatformId: null },
};

// Helper function to save the state to localStorage
const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('platformState', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving platform state to localStorage:', error);
  }
};

// Helper function to load the state from localStorage
const loadFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem('platformState');
    return savedState ? JSON.parse(savedState) : initialState;
  } catch (error) {
    console.error('Error loading platform state from localStorage:', error);
    return initialState;
  }
};

// Platform reducer to handle platform linking states
const platformReducer = (state = loadFromLocalStorage(), action) => {
  const { platform } = action.payload || {};

  switch (action.type) {
    case LINK_PLATFORM_REQUEST:
      return {
        ...state,
        [platform]: {
          ...state[platform],
          loading: true,
          success: false,
          error: null,
        },
      };

    case LINK_PLATFORM_SUCCESS: {
      const updatedState = {
        ...state,
        [platform]: {
          ...state[platform],
          loading: false,
          success: true,
          error: null,
          userPlatformId: action.payload.userPlatformId,
        },
      };
      saveToLocalStorage(updatedState);
      return updatedState;
    }

    case LINK_PLATFORM_FAILURE: {
      const updatedState = {
        ...state,
        [platform]: {
          ...state[platform],
          loading: false,
          success: false,
          error: action.payload.error,
          userPlatformId: null,
        },
      };
      saveToLocalStorage(updatedState);
      return updatedState;
    }

    default:
      return state;
  }
};

export default platformReducer;
