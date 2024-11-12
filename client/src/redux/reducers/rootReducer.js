import { combineReducers } from 'redux';
import authReducer from './authReducer';
import trendsReducer from './trendReducer';
import generateTextReducer from './generateTextReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  trends: trendsReducer,
  generateText: generateTextReducer,
});

export default rootReducer;
