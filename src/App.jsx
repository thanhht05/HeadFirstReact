import "./assets/root.css";
import "./assets/app.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAccountApi } from "./services/apiService";
import { setLoading, setUser } from "./redux/action/actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await getAccountApi();
      if (res.data) {
        dispatch(
          setUser({
            id: res.data.userLogin.id,
            email: res.data.userLogin.email,
            fullName: res.data.userLogin.fullname,
            role: {
              name: res.data.userLogin.role.name,
            },
          }),
        );
      }
      dispatch(setLoading(false));
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
