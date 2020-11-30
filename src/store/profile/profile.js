const initialState = {
  isLoading: false,
  error: null,
  player: [],
};

const getPlayer = ({ players, id }) => {
  const p = (players || []).filter((player) => player.id === id);
  return p.length ? p[0] : [];
};

const playerBioReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PLAYER_BIO":
      return {
        ...state,
        player: getPlayer(action),
      };
    default:
      return state;
  }
};

export default playerBioReducer;
