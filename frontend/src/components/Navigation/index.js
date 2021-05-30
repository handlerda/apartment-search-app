// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav>
      <ul className="nav-container">
        <NavLink className="nav-link" to="/">
          Apartment App
        </NavLink>
        <NavLink className="nav-link" to="/">
          Apartment App
        </NavLink>
        <NavLink className="nav-link" exact to="/" id="home-button"></NavLink>
        {isLoaded && <div className="session-links">{sessionLinks}</div>}
      </ul>
    </nav>
  );
}

export default Navigation;
