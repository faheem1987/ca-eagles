import loginReducer from './login/login';
import formReducer from "./form/form";

import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: loginReducer,
  formReducer: formReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer;