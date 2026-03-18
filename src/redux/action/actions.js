import { fetchAllUserApi, createUserApi } from "../../services/apiService";
import {
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  CREATE_USER_ERROR,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
} from "../action/types";

export const fetchAllUsers = () => {
  return async (dispatch) => {
    dispatch(fetcUsershRequest());

    try {
      const res = await fetchAllUserApi();

      dispatch(fetcUsersSuccess(res.data.results));
    } catch (error) {
      dispatch(fetcUsersError());
    }
  };
};
export const fetcUsershRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};
export const fetcUsersSuccess = (payload) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload,
  };
};
export const fetcUsersError = () => {
  return {
    type: FETCH_USER_ERROR,
  };
};
// CREATE USER

export const createUserRedux = (fullName, email, password, phone) => {
  return async (dispatch) => {
    dispatch(createUserRequest());

    try {
      const res = await createUserApi(fullName, email, password, phone);

      if (res && res.data) {
        console.log("API data create user:", res.data);

        dispatch(createUserSuccess(res.data));

        dispatch(fetchAllUsers()); // refresh list
      }
    } catch (error) {
      dispatch(createUserError());
    }
  };
};
export const createUserRequest = () => {
  return {
    type: CREATE_USER_REQUEST,
  };
};
export const createUserError = () => {
  return {
    type: CREATE_USER_ERROR,
  };
};

export const createUserSuccess = (payload) => {
  return {
    type: CREATE_USER_SUCCESS,

    payload,
  };
};
