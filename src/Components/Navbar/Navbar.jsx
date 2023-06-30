import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../Images/logo-dark.png";
import styles from "./Navbar.module.scss";
export default function Navbar({ userdata, logout }) {
  return (
    <>
      <nav className={`navbar navbar-expand-lg  display-flex ${styles.bgNav}`}>
        <div className={`container-fluid`}>
          <NavLink className={`navbar-brand fw-bolder ms-5 fs-1`}>
            <img className={styles.logoImg} src={logo} alt="" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userdata ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink
                      // className="nav-link active"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-info  nav-link active"
                          : "nav-link active"
                      }
                      aria-current="page"
                      to=""
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "bg-info  nav-link active"
                          : "nav-link active"
                      }
                      to="Movies"
                    >
                      Movies
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "bg-info  nav-link active"
                          : "nav-link active"
                      }
                      to="Tvshows"
                    >
                      Tv shows
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "bg-info  nav-link active"
                          : "nav-link active"
                      }
                      to="People"
                    >
                      People
                    </NavLink>
                  </li>
                </ul>
              </>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userdata ? (
                <>
                  
                  <div className={`${styles.iconsNav}`}>
                    <a target="_blank" href="https://www.facebook.com/">
                    <i className="fab fa-facebook "></i>
                    </a>
                    <a target="_blank" href="https://accounts.spotify.com/en/login">
                    <i className="fab fa-spotify"></i>
                    </a>
                    <a target="_blank" href="https://www.instagram.com/">
                    <i className="fab fa-instagram"></i>
                    </a>
                    <a target="_blank" href="https://www.youtube.com/">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                  <li className="nav-item  ">
                    <NavLink className="nav-link " onClick={logout}>
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item ">
                    <NavLink className="nav-link" to="Register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item ">
                    <NavLink className="nav-link" to="Login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {/* -------------------------------------------------- */}

            {/* -------------------------------------------------- */}
          </div>
        </div>
      </nav>
    </>
  );
}
