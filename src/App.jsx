import "./assets/root.css";
import "./assets/app.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { getAccountApi } from "./services/apiService";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/AuthContext";
import { Spin } from "antd";

import { useDispatch } from "react-redux";
import { fetchAllUsers } from "./redux/action/actions";

function App() {
  const { isAppLoading, setIsAppLoading } = useContext(AuthContext);
  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
    setIsAppLoading(false);
  });

  return (
    <>
      {isAppLoading === true ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spin />
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
