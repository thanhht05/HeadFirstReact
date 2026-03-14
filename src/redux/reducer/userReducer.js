import {
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from "../action/types";
const INITAL_STATE = {
  listUsers: [],
  isLoading: false,
  isError: false,
};
const userReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      console.log("FETCH_USER_REQUEST: ", action);
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_USER_SUCCESS:
      console.log("FETCH_USER_SUCCESS: ", action);
      return {
        ...state,
        listUsers: action.payload,
        isLoading: false,

        isError: false,
      };
    case FETCH_USER_ERROR:
      console.log("FETCH_USER_ERROR: ", action);

      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
export default userReducer;
