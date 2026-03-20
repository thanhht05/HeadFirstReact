import {
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  CREATE_USER_ERROR,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  SET_USER,
  SET_LOADING,
} from "../action/types";
const INITAL_STATE = {
  listUsers: [],
  isLoading: false,
  isError: false,
  isCreated: false,
  isErrorCreateUser: false,
  user: null,
  isLoadingFetchUser: true,
  isCreating: false,
};
const userReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        listUsers: action.payload,
        isLoading: false,

        isError: false,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case CREATE_USER_REQUEST:
      return {
        ...state,
        isErrorCreateUser: false,
        isCreated: false,
        isCreating: true,
      };

    case CREATE_USER_SUCCESS:
      console.log("OK create");
      return {
        ...state,
        isErrorCreateUser: false,
        isCreated: true, // 👈 trigger UI
        // listUsers: [...state.listUsers, action.payload],
        isCreating: false,
      };

    case CREATE_USER_ERROR:
      return {
        ...state,
        isErrorCreateUser: true,
        isCreating: false,
        isCreated: false,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoadingFetchUser: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
