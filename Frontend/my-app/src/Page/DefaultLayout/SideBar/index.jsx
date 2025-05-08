import React from "react";
import "./SideBar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Features/Auth/authSlice";
import { Button } from "antd";

const SidebarMenu = ({ isOpen, onClose }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const handelLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <div className={`sidebar ${isOpen ? "slide-in" : "slide-out"}`}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <nav className="sidebar-nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/models">Mô hình</Link>
          <Link to="/assignment">Luyện tập</Link>
          <Link to="/colection">Lịch sử luyện tập</Link>
          {isAuth ? (
            <Link to="/login">
              <Button onClick={handelLogout}>Logout</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>

      {isOpen && <div className="overlay" onClick={onClose}></div>}
    </>
  );
};

export default SidebarMenu;
