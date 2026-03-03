import "./assets/root.css";
import "./assets/app.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { getAccountApi } from "./services/apiService";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/AuthContext";
import { Spin } from "antd";

function App() {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    const fetchUserInfo = async () => {
      await delay(1000); // giả lập network chậm
      const res = await getAccountApi();

      if (res.data) {
        setUser({
          id: res.data.userLogin.id,
          email: res.data.userLogin.email,
          fullName: res.data.userLogin.fullname,
          role: {
            name: res.data.userLogin.role.name,
          },
        });
      }
      setIsAppLoading(false);
    };
    // setInterval(() => {}, interval);
    fetchUserInfo();
  }, []);

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
