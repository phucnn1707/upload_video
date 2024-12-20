import { FETCH_LINKED_ACCOUNTS_REQUEST, FETCH_LINKED_ACCOUNTS_SUCCESS, FETCH_LINKED_ACCOUNTS_FAILURE } from '../types';

const initialState = {
  accounts: [], // Ensure this is an array
  loading: false,
  error: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LINKED_ACCOUNTS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_LINKED_ACCOUNTS_SUCCESS:
      return { ...state, loading: false, accounts: action.payload || [], error: null };

    case FETCH_LINKED_ACCOUNTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default accountReducer;
