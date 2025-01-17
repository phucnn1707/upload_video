import {
  LINK_PLATFORM_REQUEST,
  LINK_PLATFORM_SUCCESS,
  LINK_PLATFORM_FAILURE,
  REVOKE_PLATFORM_REQUEST,
  REVOKE_PLATFORM_SUCCESS,
  REVOKE_PLATFORM_FAILURE,
  GET_LINKED_ACCOUNTS_REQUEST,
  GET_LINKED_ACCOUNTS_SUCCESS,
  GET_LINKED_ACCOUNTS_FAILURE,
} from '../types';

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

// Platform reducer to handle platform linking and revoking states
const platformReducer = (state = loadFromLocalStorage(), action) => {
  const platform = action.payload?.platform;

  switch (action.type) {
    // Linking actions
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

    // Revoking actions
    case REVOKE_PLATFORM_REQUEST:
      return {
        ...state,
        [platform]: {
          ...state[platform],
          loading: true,
          error: null,
        },
      };

    case REVOKE_PLATFORM_SUCCESS: {
      const updatedState = {
        ...state,
        [platform]: {
          ...state[platform],
          loading: false,
          success: false, // Reset success to false
          error: null,
          userPlatformId: null, // Clear the userPlatformId
        },
      };
      console.log(updatedState);
      saveToLocalStorage(updatedState);
      return updatedState;
    }

    case REVOKE_PLATFORM_FAILURE: {
      const updatedState = {
        ...state,
        [platform]: {
          ...state[platform],
          loading: false,
          error: action.payload.error,
        },
      };
      saveToLocalStorage(updatedState);
      return updatedState;
    }

    // Fetch linked accounts
    case GET_LINKED_ACCOUNTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_LINKED_ACCOUNTS_SUCCESS:
      const updatedState = { ...state };

      if (action.payload.length === 0) {
        saveToLocalStorage(initialState);
        return initialState;
      }

      action.payload.forEach((account) => {
        const platformKey = account.platform.toLowerCase();
        updatedState[platformKey] = {
          ...updatedState[platformKey],
          loading: false,
          success: true,
          userPlatformId: account.platform_user_id,
          linkedAt: account.linked_at,
          error: null,
        };
      });
      saveToLocalStorage(updatedState);
      return updatedState;

    case GET_LINKED_ACCOUNTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default platformReducer;
