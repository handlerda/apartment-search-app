import React, { useEffect, useState } from "react";
import Card from "../Card";
import "./HomePage.css";
import apartmentReducer, { getLocalApartments } from "../../store/apartment";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  //get location data for a public user
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const dispatch = useDispatch();
  const apartments = useSelector((state) => state.apartments.apartments);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });

    if (lat && lon) {
      console.log(`hello world`);
      console.log(lat, lon);
      dispatch(getLocalApartments({ lat, lon }));
    }
  }, [lat, lon, dispatch]);
  console.log(apartments);

  return (
    apartments && (
      <div className="card-board">
        {apartments.results.map((apt) => {
          return (
            <Card
              key={apt.place_id}
              title={apt.name}
              address={apt.formatted_address}
              ratings={apt.rating}
              location={apt.geometry.location}
            />
          );
        })}
      </div>
    )
  );
}

export default HomePage;
