import { combineReducers } from 'redux';
import auth from './auth';
import logos from './logos';
import favorites from './favorites';

const allReducers = combineReducers({
  auth,
  logos,
  favorites
});

export default allReducers;
