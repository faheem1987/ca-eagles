const getProfile = (players, id) => (dispatch) =>
  dispatch({ type: "GET_PLAYER_BIO", players, id });

export default getProfile;
