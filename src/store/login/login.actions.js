export const login = (credentials) => (dispatch, getState, { getFirebase }) => {
  dispatch({ type: "LOGIN_REQUEST" });
  const firebase = getFirebase();
  return firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      return dispatch({ type: "LOGIN_SUCCESS" });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE", err });
      return Promise.reject(err);
    });
};

export const logout = () => (dispatch, getState, { getFirebase }) => {
  dispatch({ type: "LOGOUT_REQUEST" });
  const firebase = getFirebase();
  firebase
    .auth()
    .signOut()
    .then(() => dispatch({ type: "LOGOUT_SUCCESS" }))
    // eslint-disable-next-line no-return-assign
    .then(() => (window.location.href = "/"))
    .catch((err) => dispatch({ type: "LOGIN_FAILURE", err }));
};
