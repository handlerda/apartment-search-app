// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  console.log(sessionUser);
  function handleNavClick(location) {
    history.push(location);
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <button onClick={() => handleNavClick(`/user/${sessionUser.id}`)}>
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
    <nav>
      <ul>
        <div className="container">
          <button onClick={() => handleNavClick("/")} className="home-button">
            Home
          </button>
          {isLoaded && <div className="session-links">{sessionLinks}</div>}
        </div>
      </ul>
    </nav>
  );
}

export default Navigation;
