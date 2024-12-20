import { combineReducers } from 'redux';
import authReducer from './authReducer';
import trendsReducer from './trendReducer';
import generateScriptReducer from './generateScriptReducer';
import textScriptReducer from './textScriptReducer';
import videoReducer from './videoReducer';
import { avatarReducer } from './avatarReducer';
import generateVideoReducer from './generateVideoReducer';
import platformReducer from './platformReducer';
import accountReducer from './accountReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  trends: trendsReducer,
  generateScript: generateScriptReducer,
  textScripts: textScriptReducer,
  videos: videoReducer,
  avatars: avatarReducer,
  generateVideo: generateVideoReducer,
  platform: platformReducer,
  account: accountReducer,
});

export default rootReducer;
