import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import formReducer from './form/form';
import loginReducer from './login/login';
import profileReducer from './profile/profile';

const rootReducer = combineReducers({
  auth: loginReducer,
  profile: profileReducer,
  formReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
