// frontend/src/components/Navigation/index.js
import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
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
          <div className="w-full relative flex justify-between ">
            <NavLink
              className=" text-sm font-bold leading-relaxed inline-block py-2 whitespace-nowrap uppercase  text-white "
              to={`/`}
            >
              Apartment App
            </NavLink>

            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>

            {/* <div
            // className={"lg:flex flex-grow items-center flex"}
            //{
            //   "lg:flex flex-grow items-center flex" +
            //   // (navbarOpen ? " flex" : " hidden")
            // }
            id="example-navbar-danger"
          > */}
            <ul className="flex flex-col lg:flex-row list-none md:flex-row ">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex  text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">My Apartments</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex  text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">My profile</span>
                </a>
              </li>
              <li className="nav-item">
                <label for="search" class="sr-only">
                  Search
                </label>
                <div class="px-3 py-2 ml-4 flex relative rounded-md shadow-sm">
                  <div
                    className="absolute  inset-y-0 flex items-center pointer-events-none"
                    aria-hidden="true"
                  >
                    <svg
                      className=" h-4 w-4 ml-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md ml-2"
                    placeholder="Search"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
