import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import apartmentReducer, {
  addInterestedApartment,
  getApartmentDetails,
} from "../../store/apartment";
import Header from "../Controls/Header";
import Review from "./Review";
import "./Apartment.css";
import Map from "../Card/Map";

function Apartment() {
  const { id } = useParams();
  const [interested, setInterested] = useState(null);

  console.log(id);
  const dispatch = useDispatch();
  // get apt details from redux
  const apartments = useSelector((state) => state.apartments.apartmentDetail);
  const interestedApartments = useSelector((state) => state.apartments);
  const sessionUser = useSelector((state) => state.session.user);

  console.log(interestedApartments);
  console.log(sessionUser);
  // get location details from redux store

  useEffect(() => {
    const aptDetails = dispatch(getApartmentDetails(id));
    if (aptDetails.isInterestedApartment) {
      setInterested(true);
    } else {
      setInterested(false);
    }
  }, []);
  console.log(id);
  console.log(apartments);
  if (!apartments) {
    return <p>loading</p>;
  }

  async function handleSave(e) {
    const data = await dispatch(addInterestedApartment(id, sessionUser.id));
    console.log(data);
    setInterested(!interested);
    return data;
  }
  console.log(`here is interested`, interested);
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
          {interested && <button onClick={handleSave}>Not Interested</button>}
          {!interested && <button onClick={handleSave}> Interested</button>}
        </div>
      </div>
    )
  );
}

export default Apartment;
