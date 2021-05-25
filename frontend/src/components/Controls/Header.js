import React from "react";
import "./Header.css";
function Header({ name, address, phoneNumber, website }) {
  return (
    <div className="container">
      <h3>Name: {name}</h3>
      <h5>Address: {address}</h5>
      <h5>Phone number: {phoneNumber}</h5>
      <h5>Website: {website}</h5>
    </div>
  );
}

export default Header;
