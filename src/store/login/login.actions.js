export const login = (credentials) => (dispatch, getState, { getFirebase }) => {
  dispatch({type: 'LOGIN_REQUEST'});
  const firebase = getFirebase();
  firebase.auth().signInWithEmailAndPassword(
    credentials.email, credentials.password
  ).then(() => dispatch({type: 'LOGIN_SUCCESS'}))
  .then(() => window.location.href = "/")
  .catch(err => dispatch({type: 'LOGIN_FAILURE', err}))
}

export const logout = () => (dispatch, getState, { getFirebase }) => {
  dispatch({type: 'LOGOUT_REQUEST'});
  const firebase = getFirebase();
  firebase.auth().signOut()
    .then(() => dispatch({type: 'LOGOUT_SUCCESS'}))
    .then(() => window.location.href = "/")
    .catch(err => dispatch({type: 'LOGIN_FAILURE', err}))
}