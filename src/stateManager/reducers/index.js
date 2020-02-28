import { combineReducers } from 'redux';
import auth from './auth';
import logos from './logos';

const allReducers = combineReducers({
  auth,
  logos
});

export default allReducers;
