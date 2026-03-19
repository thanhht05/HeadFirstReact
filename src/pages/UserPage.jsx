import { useEffect, useState } from "react";
import UserTable from "../components/users/User";
import UserForm from "../components/users/UserForm";
import { fetchAllUserApi } from "../services/apiService";

const UserPage = () => {
  const [dataUsers, setDataUsers] = useState([]);

  const loadUser = async () => {
    const res = await fetchAllUserApi();
    // debugger;
    setDataUsers(res.data.results);
  };
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div>
      <UserForm loadUser={loadUser} />
      <UserTable dataUsers={dataUsers} loadUser={loadUser} />
    </div>
  );
};

export default UserPage;
