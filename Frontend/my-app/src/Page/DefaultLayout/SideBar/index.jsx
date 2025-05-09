import React from "react";
import "./SideBar.scss";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Features/Auth/authSlice";
import { Button } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  BookOutlined,
  HistoryOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const SidebarMenu = ({ isOpen, onClose }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const location = useLocation();

  const handelLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    { path: "/", icon: <HomeOutlined />, label: "Trang chủ" },
    { path: "/models", icon: <AppstoreOutlined />, label: "Mô hình" },
    { path: "/assignment", icon: <BookOutlined />, label: "Luyện tập" },
    {
      path: "/colection",
      icon: <HistoryOutlined />,
      label: "Lịch sử luyện tập",
    },
  ];

  const authItems = isAuth
    ? [
        {
          path: "/login",
          icon: <LogoutOutlined />,
          label: "Đăng xuất",
          onClick: handelLogout,
        },
      ]
    : [
        { path: "/login", icon: <LoginOutlined />, label: "Đăng nhập" },
        { path: "/register", icon: <UserAddOutlined />, label: "Đăng ký" },
      ];

  return (
    <>
      <div className={`sidebar ${isOpen ? "slide-in" : "slide-out"}`}>
        <button className="close-btn" onClick={onClose}>
          <CloseOutlined />
        </button>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? "active" : ""}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          {authItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? "active" : ""}
              onClick={item.onClick}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
    </>
  );
};

export default SidebarMenu;
