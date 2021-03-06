const initialState = {
  isLoading: false,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST": {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    }
    case "LOGIN_FAILURE": {
      return {
        ...state,
        isLoading: false,
        error: action.err.message || "Something went wrong. Pleas try again!",
      };
    }
    default:
      return state;
  }
};

export default loginReducer;
