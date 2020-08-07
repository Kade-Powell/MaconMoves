import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import serviceConfigForm from './serviceConfigForm';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  serviceConfigForm,
});
