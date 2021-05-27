import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import apartmentReducer, {
  addInterestedApartment,
  addNewTenant,
  deleteCurrentTenant,
  deleteInterestedApartment,
  getApartmentDetails,
} from "../../store/apartment";
import Header from "../Controls/Header";
import Review from "./Review";
import "./Apartment.css";
import Map from "../Card/Map";
import InternalReview from "../InternalReview";
import InterestedTenant from "./InterestedTenant";

function Apartment() {
  const { id } = useParams();
  const history = useHistory();

  console.log(id);
  const dispatch = useDispatch();
  // get apt details from redux
  const apartments = useSelector((state) => state.apartments.apartmentDetail);
  const tenantStatus = useSelector((state) => state.apartments.addNewTenant);
  const sessionUser = useSelector((state) => state.session.user);
  console.log(`here is the sessionUser`, sessionUser);
  const [interested, setInterested] = useState(null);
  const [tenant, setTenant] = useState(null);

  // no session user redirect to login
  if (!sessionUser) {
    history.push("/login");
  }

  useEffect(() => {
    const getAptDetails = async () => {
      const aptDetails = await dispatch(getApartmentDetails(id));
      aptDetails.isInterestedApartment
        ? setInterested(true)
        : setInterested(false);
      aptDetails.currentTenant ? setTenant(true) : setTenant(false);
    };
    getAptDetails();
  }, [dispatch]);
  console.log(id);
  console.log(apartments);
  if (!apartments) {
    return <p>loading</p>;
  }

  async function handleInterestedSave(e) {
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

  async function handleTenantSave(e) {
    if (!tenant) {
      const data = await dispatch(addNewTenant(id, sessionUser.id));
      setTenant(!tenant);
      console.log(data);
      return data;
    } else {
      const data = await dispatch(deleteCurrentTenant(id, sessionUser.id));
      setTenant(!tenant);
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
            {console.log(apartments)}
            {apartments.result.reviews ? (
              apartments.result.reviews.map((review) => {
                return (
                  <Review
                    date={review.relative_time_description}
                    name={review.author_name}
                    text={review.text}
                    rating={review.rating}
                  />
                );
              })
            ) : (
              <h1>There are no public reviews</h1>
            )}
          </div>
        </div>
        <div className="apartment-right-container">
          <div className="btn-group">
            {interested === true ? (
              <button onClick={handleInterestedSave}>
                Not Interested in living here
              </button>
            ) : (
              <button onClick={handleInterestedSave}>
                Interested in living here
              </button>
            )}
            <div>
              {tenant === true ? (
                <button onClick={handleTenantSave}>I don't live here</button>
              ) : (
                <button onClick={handleTenantSave}>I live here</button>
              )}
            </div>
          </div>
          {tenant === false && apartments.associatedReviews.length > 0 && (
            <h1 className="user-review-header">User Reviews</h1>
          )}

          {tenant === false && apartments.associatedReviews.length === 0 && (
            <h1 className="user-review-header">No User Reviews</h1>
          )}

          {tenant === true ? (
            <InternalReview />
          ) : (
            apartments.associatedReviews.map((review) => {
              return review.InterestedTenants.map((tenant) => {
                return (
                  <InterestedTenant
                    title={review.title}
                    body={review.body}
                    name={review.User.username}
                    text={tenant.text}
                    email={tenant.email}
                    other={tenant.other}
                    requestedAmount={tenant.requestedAmount}
                    phone={tenant.phone}
                    paymentOptions={tenant.paymentPreference}
                    key={tenant.id}
                  />
                );
              });
            })
          )}
        </div>
      </div>
    )
  );
}

export default Apartment;
