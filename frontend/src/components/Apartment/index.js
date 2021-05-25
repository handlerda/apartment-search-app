import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import apartmentReducer, { getApartmentDetails } from "../../store/apartment";
import Header from "../Controls/Header";
import Review from "./Review";
import "./Apartment.css";
import Map from "../Card/Map";

function Apartment() {
  const { id } = useParams();
  const dispatch = useDispatch();
  // get apt details from redux
  const apartments = useSelector((state) => state.apartments.apartmentDetail);
  // get location details from redux store
  const apartmentLocDetails = useSelector((state) =>
    state.apartments.apartments.results.find((apt) => apt.place_id === id)
  );

  useEffect(() => {
    dispatch(getApartmentDetails(id));
  }, [dispatch]);
  console.log(id);
  console.log(apartments);
  if (!apartments) {
    return <p>loading</p>;
  }
  return (
    apartments && (
      <div className="apartment-container">
        <div className="apartment-left-container">
          <div className="apartment-header">
            <Header
              name={apartments.result.name}
              address={apartments.result.formatted_address}
            />
          </div>
          <div>
            <h5>Public Reviews</h5>
            {apartments.result.reviews.map((review) => {
              return (
                <Review
                  date={review.relative_time_description}
                  name={review.author_name}
                  text={review.text}
                  rating={review.rating}
                />
              );
            })}
          </div>
        </div>
        <div className="apartment-right-container">
          <Map location={apartments.result.geometry.location} />
        </div>
      </div>
    )
  );
}

export default Apartment;
