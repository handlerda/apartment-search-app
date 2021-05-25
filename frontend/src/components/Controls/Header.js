import React from "react";
import "./Header.css";
function Header({ name, address }) {
  return (
    <div className="container">
      <h3>{name}</h3>
      <h5>{address}</h5>
    </div>
  );
}

export default Header;
