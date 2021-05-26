import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import apartmentReducer, {
  addInterestedApartment,
  deleteInterestedApartment,
  getApartmentDetails,
} from "../../store/apartment";
import Header from "../Controls/Header";
import Review from "./Review";
import "./Apartment.css";
import Map from "../Card/Map";
import InternalReview from "../InternalReview";

function Apartment() {
  const { id } = useParams();

  console.log(id);
  const dispatch = useDispatch();
  // get apt details from redux
  const apartments = useSelector((state) => state.apartments.apartmentDetail);
  //const interestedApartments = useSelector((state) => state.apartments.apartmentDetail.isInterestedApartment);
  const sessionUser = useSelector((state) => state.session.user);
  const [interested, setInterested] = useState(null);

  //console.log(interestedApartments);
  console.log(sessionUser);
  // get location details from redux store

  useEffect(() => {
    const getAptDetails = async () => {
      const aptDetails = await dispatch(getApartmentDetails(id));
      aptDetails.isInterestedApartment
        ? setInterested(true)
        : setInterested(false);
    };
    getAptDetails();
  }, [dispatch]);
  console.log(id);
  console.log(apartments);
  if (!apartments) {
    return <p>loading</p>;
  }

  async function handleSave(e) {
    if (!interested) {
      const data = await dispatch(addInterestedApartment(id, sessionUser.id));
      setInterested(!interested);
      console.log(data);
      return data;
    } else {
      const data = await dispatch(
        deleteInterestedApartment(id, sessionUser.id)
      );
      setInterested(!interested);
      console.log(data);
      return data;
    }
  }

  return (
    apartments &&
    interested !== null && (
      <div className="apartment-container">
        <div className="apartment-left-container">
          <div className="apartment-header">
            <Header
              name={apartments.result.name}
              address={apartments.result.formatted_address}
              website={apartments.result.website}
              phoneNumber={apartments.result.formatted_phone_number}
            />
          </div>
          <Map location={apartments.result.geometry.location} />
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
          {interested === true ? (
            <button onClick={handleSave}>Not Interested</button>
          ) : (
            <button onClick={handleSave}> Interested</button>
          )}
          <InternalReview />
        </div>
      </div>
    )
  );
}

export default Apartment;
