import { NavLink, Outlet } from "react-router-dom";
import "./DefaultLayout.scss";
import logo from "../../assets/Images/logo.png";
import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Features/Auth/authSlice";
import SidebarMenu from "./SideBar";
export default function DefaultLayout() {
  const dispatch = useDispatch();
  const handelLogout = () => {
    dispatch(logout());
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      <div className="wrap">
        <header className="header">
          <div className="header__logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="header__nav">
            <ul>
              <li>
                <NavLink to="/">Trang chủ</NavLink>
              </li>
              <li>
                <NavLink to="/models">Mô hình</NavLink>
              </li>
              <li>
                <NavLink to="/assigment">Luyện tập</NavLink>
              </li>
              <li>
                <NavLink to="/colection">Lịch sử luyện tập</NavLink>
              </li>
            </ul>
          </div>
          <div className="sidebar__menu">
            <button className="menu-button" onClick={() => setMenuOpen(true)}>
              ☰
            </button>
          </div>

          <div className="header__enter">
            {isAuthenticated ? (
              <NavLink to="/login">
                <Button onClick={handelLogout}>Logout</Button>
              </NavLink>
            ) : (
              <>
                <NavLink to="/login">
                  <Button>Login</Button>
                </NavLink>
                <NavLink to="/register">
                  <Button>Register</Button>
                </NavLink>
              </>
            )}
          </div>
        </header>
        <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="main">
          <Outlet />
        </main>
        <footer className="footer">
          <ul className="footer__nav">
            <li className="footer__social">
              <div className="social-links">
                <a href="#" className="social facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social linkedin">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </li>
            <li className="footer__copyrigth">
              <p>CopyRight by IT</p>
            </li>
            <li className="footer__logo">
              <img src={logo} alt="logo" />
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
