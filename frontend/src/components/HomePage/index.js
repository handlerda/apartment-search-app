import React, { useEffect } from "react";
import Card from "../Card";
import "./HomePage.css";

function HomePage() {
  //get location data for a public user
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    });
  }, []);
  return (
    <div className="card-board">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default HomePage;
