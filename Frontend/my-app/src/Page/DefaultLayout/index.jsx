import { NavLink, Outlet } from "react-router-dom";
import "./DefaultLayout.scss";
import logo from "../../assets/Images/logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaInstagramSquare } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "antd";
import React from "react";
export default function DefaultLayout() {
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
                <NavLink to="/colection">Bộ sưu tập</NavLink>
              </li>
            </ul>
          </div>
          <div className="header_enter">
            <NavLink to="/login">
              <Button>Login</Button>
            </NavLink>
            <NavLink to="/register">
              <Button>Register</Button>
            </NavLink>
          </div>
        </header>
        <main className="main">
          <Outlet />
        </main>
        <footer className="footer">
          <ul className="footer__nav">
            <li className="footer__social">
              <ul>
                <li>
                  <FaFacebook size={25} color="blue" />
                </li>
                <li>
                  <FaFacebookMessenger size={25} color="blue" />
                </li>
                <li>
                  <IoIosMail size={25} color="blue" />
                </li>
                <li>
                  <FaInstagramSquare size={25} color="blue" />
                </li>
              </ul>
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
