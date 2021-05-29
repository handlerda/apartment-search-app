// frontend/src/components/Navigation/index.js
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const buttonClass = `inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`;
  console.log(sessionUser);
  const [navbarOpen, setNavbarOpen] = useState(false);
  function handleNavClick(location) {
    history.push(location);
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <button
        onClick={() => handleNavClick(`/user/${sessionUser.id}`)}
        className={buttonClass}
      >
        User Profile
      </button>
    );
    // <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <button
          className="log-nav-button"
          onClick={() => handleNavClick("/login")}
        >
          Log In
        </button>
        <button
          className="log-nav-button"
          onClick={() => handleNavClick("/signup")}
        >
          Log out
        </button>
      </>
    );
  }

  return (
    // <nav>
    //   <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
    //     <div className="flex justify-between h-8">
    //       <div className="flex px-2 lg:px-0">
    //         <div className="flex-2 flex items-center justify-items-center">
    //           <button
    //             onClick={() => handleNavClick("/")}
    //             className={buttonClass}
    //           >
    //             Home
    //           </button>
    //           <div className="float-right">{isLoaded && sessionLinks}</div>
    //         </div>
    //         <div class="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
    //           Hello world
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-orange-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#pablo"
            >
              orange Tailwind Starter Kit
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Share</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Tweet</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Pin</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
