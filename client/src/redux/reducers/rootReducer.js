import { combineReducers } from 'redux';
import authReducer from './authReducer';
import trendsReducer from './trendReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  trends: trendsReducer,
});

export default rootReducer;
