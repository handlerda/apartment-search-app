import React from "react";
import "./Header.css";
function Header({ name, address, phoneNumber, website }) {
  return (
    <div className="header-container">
      <h3>{name}</h3>
      <p>
        <span className="header-span-bold">Address: </span> {address}
      </p>
      <p>
        <span className="header-span-bold">Phone Number: </span>
        {phoneNumber}
      </p>
      <p>
        <span className="header-span-bold">Website: </span>
        {website}
      </p>
    </div>
  );
}

export default Header;
