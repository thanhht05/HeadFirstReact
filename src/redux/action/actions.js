import {
  fetchAllUserApi,
  createUserApi,
  deleteUserByIdApi,
} from "../../services/apiService";
import {
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  CREATE_USER_ERROR,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  SET_USER,
  SET_LOADING,
  DELETE_USER_SUCCESS,
} from "../action/types";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
      await delay(5000); // delay 2s
      const res = await createUserApi(fullName, email, password, phone);

      if (res && res.data) {
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

// Set user
// action creator
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setLoading = (status) => {
  return {
    type: SET_LOADING,
    payload: status,
  };
};

// delte user

export const deleteUserRedux = (id) => {
  return async (dispatch) => {
    try {
      const res = await deleteUserByIdApi(id);
      if (res.data) {
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsers()); // refresh list
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUserSuccess = () => {
  return {
    type: DELETE_USER_SUCCESS,
  };
};
