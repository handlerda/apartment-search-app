import React from "react";
import "./Card.css";
import Map from "./Map";

function Card({ title, address, ratings, location }) {
  console.log(location);
  return (
    <div className="card">
      <Map location={location} />
      <div className="card-body">
        <h2 id="title">{title}</h2>
        <h5 id="address">Address {address}</h5>
      </div>
      <h5 id="raitings">Ratings {ratings}</h5>
    </div>
  );
}

export default Card;
