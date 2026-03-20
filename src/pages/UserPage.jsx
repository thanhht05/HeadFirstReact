import UserTable from "../components/users/User";
import UserForm from "../components/users/UserForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../redux/action/actions";
import { useEffect } from "react";

const UserPage = () => {
  const dispatch = useDispatch();
  const listUsers = useSelector((state) => state.user.listUsers);

  const loadUser = () => {
    dispatch(fetchAllUsers());
  };
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div>
      <UserForm loadUser={loadUser} />
      <UserTable listUsers={listUsers} loadUser={loadUser} />
    </div>
  );
};

export default UserPage;
