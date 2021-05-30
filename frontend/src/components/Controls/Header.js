import React from "react";
import "./Header.css";
function Header({ name, address, phoneNumber, website }) {
  return (
    <div className="header-container">
      <h3>
        <span className="font-bold">Name: </span>
        {name}
      </h3>
      <h5>
        <span className="font-bold">Address: </span>
        {address}
      </h5>
      <h5>
        <span className="font-bold">Phone Number: </span>
        {phoneNumber}
      </h5>
      <h5>
        <span className="font-bold">Website: </span> {website}
      </h5>
    </div>
  );
}

export default Header;
