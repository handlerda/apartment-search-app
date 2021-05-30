import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import Map from "./Map";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  CodeIcon,
  DotsVerticalIcon,
  FlagIcon,
  StarIcon,
} from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function Card({ title, address, ratings, location, photoId, id }) {
  console.log(photoId);
  return (
    <Link to={`/apartment/${id}`}>
      <div className="card">
        {/* <Map location={location} /> */}
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
            photoId ? photoId[0].photo_reference : null
          }&key=${process.env.REACT_APP_GOOGLE_API_CODE}`}
          alt="generalImg"
          className="card-img"
        ></img>
        <div className="card-body">
          <h2 id="title">{title}</h2>
          <h5 id="address">Address {address}</h5>
          <h5 id="ratings">Stars {ratings}</h5>
        </div>
      </div>
    </Link>
  );
}

export default Card;
