import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, message } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  HomeOutlined,
  UserDeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import UserTable from "../users/User";
import Product from "../products/Books";
import { AuthContext } from "../context/AuthContext";
import { logoutApi } from "../../services/apiService";
import { useSelector } from "react-redux";

// import "./header.css";
const Header = () => {
  const [current, setCurrent] = useState("home");
  // const { user, setUser } = useContext(AuthContext);
  const user = useSelector((state) => state.user.listUsers);

  const navigate = useNavigate();

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const handleLogout = async () => {
    const res = await logoutApi();
    if (res.data) {
      localStorage.removeItem("accessToken");
      setUser({
        id: "",
        email: "",
        fullName: "",
        role: {
          name: "",
        },
      });
      message.success("Logout successfuly");
      navigate("/login");
    }
  };

  const profileMenu = !user.id
    ? {
        label: "Profile",
        key: "SubMenu",
        icon: <SettingOutlined />,
        children: [
          {
            type: "group",
            label: "Item 1",
            children: [
              { label: <Link to="/register">Register</Link>, key: "register" },
              { label: <Link to="/login">Login</Link>, key: "login" },
            ],
          },
        ],
      }
    : {
        label: `Welcome ${user.email}`,
        key: "userLogin",
        icon: <SettingOutlined />,
        children: [
          {
            type: "group",
            label: "Account",
            children: [
              {
                label: <span onClick={handleLogout}>Logout</span>,
                key: "logout",
              },
            ],
          },
        ],
      };

  const items = [
    {
      label: <Link to="/"> Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/users"> User</Link>,
      key: "user",
      icon: <UserDeleteOutlined />,
    },
    {
      label: <Link to="/books"> Book</Link>,
      key: "book",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to="/products"> Product</Link>,
      key: "product",
      icon: <AppstoreOutlined />,
    },
    profileMenu,
  ];
  // return (
  //   <header className="header">
  //     <div className="logo">MyApp</div>

  //     <nav className="nav">
  //       <NavLink to={"/"}>Home</NavLink>
  //       <NavLink to={"/users"}>User</NavLink>
  //       <NavLink to={"/products"}>Product</NavLink>
  //     </nav>
  //   </header>
  // );
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default Header;
