//apartment controllers // helper functions
require("dotenv").config({ path: "../../.env" });
const axios = require("axios");

const {
  User,
  Apartment,
  InterestedApartment,
  Address,
  Review,
  InterestedTenant,
} = require("../../db/models");

const addReview = async (reviewData) => {
  const { authorId, title, body, apartmentId, anonymous } = reviewData;
  try {
    const review = await Review.create({
      authorId,
      title,
      body,
      apartmentId,
      anonymous,
    });
    return review;
  } catch (error) {
    return error;
  }
};

const addInterestedTenant = async (tenantData) => {
  const {
    reviewId,
    text,
    email,
    phone,
    requestedAmount,
    other,
    paymentPreference,
  } = tenantData;
  try {
    const interestedTenant = await InterestedTenant.create({
      reviewId,
      text,
      email,
      phone,
      requestedAmount,
      other,
      paymentPreference,
    });
    console.log(interestedTenant);
    return interestedTenant;
  } catch (error) {
    return error;
  }
};

// const interestedTenantInfo = {
//   reviewId: newReview.id,
//   text,
//   email,
//   phone,
//   amount,
//   other,
//   paymentPreference,
// };

module.exports = { addReview, addInterestedTenant };
