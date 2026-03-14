import { fetchAllUserApi } from "../../services/apiService";
import {
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from "../action/types";

export const fetchAllUsers = () => {
  return async (dispatch) => {
    dispatch(fetcUsershRequest());

    try {
      const res = await fetchAllUserApi();

      console.log("API data:", res.data);

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
