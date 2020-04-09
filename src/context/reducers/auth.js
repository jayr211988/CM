export const initialState = {
  isAuthenticated: false,
  isFetching: true,
  data: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "PROFILE_UPDATE":
      return {
        ...state,
        ...action.payload,
        isFetching: false,
        isAuthenticated: true
      };
    case "PROFILE_RESET":
      return {
        ...state,
        ...initialState,
        isFetching: false
      };
    default:
      return initialState;
  }
};

export default authReducer;

