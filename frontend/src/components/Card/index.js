import React from "react";
import "./Card.css";
import Map from "./Map";
function Card({ title, address, ratings, location, photoId }) {
  console.log(photoId);
  return (
    <div className="card">
      {/* <Map location={location} /> */}
      <img
        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
          photoId ? photoId[0].photo_reference : null
        }&key=AIzaSyB1nea7eJlSu9EO1hK2b6aikmL-XIANjDg`}
        width="200px"
        height="200px"
        alt="generalImg"
      ></img>
      <div className="card-body">
        <h2 id="title">{title}</h2>
        <h5 id="address">Address {address}</h5>
        <h5 id="ratings">Stars {ratings}</h5>
      </div>
    </div>
  );
}

export default Card;
