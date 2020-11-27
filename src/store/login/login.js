const initialState = {
  isLogging: false,
  error: null
};

const loginReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'LOGIN_REQUEST': {
      return {
        ...state,
        isLogging: true,
        error: null
      }
    }
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        isLogging: false,
        error: null
      }
    }
    case 'LOGIN_FAILURE': {
      return {
        ...state,
        isLogging: false,
        error: 'Login failed'
      }
    }
  }
  return state;
}

export default loginReducer;