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
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function getPlaces(lat, lon) {
  const request = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${GOOGLE_API_KEY}&query=apartments&locationbias=point${lat},${lon}`;
  const response = await axios.get(request);
  const data = await response.data;
  return data;
}

async function getPlace(id) {
  const request = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${GOOGLE_API_KEY}`;
  const response = await axios.get(request);
  const data = await response.data;
  return data;
}

async function addPlace(googlePlaceId) {
  //return a the new apartment
  const place = await getPlace(googlePlaceId);
  console.log(place);
  const address = await Address.create({
    latitude: place.result.geometry.location.lat,
    longitude: place.result.geometry.location.lng,
    formattedAddress: place.result.formatted_address,
  });
  const apartment = await Apartment.create({
    addressId: address.id,
    googlePlaceId: place.result.place_id,
  });
  return apartment;
}

async function checkCurrentTenant(userId, apartmentId) {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });
  // returns true if the user has the same apt id as what is being passed in
  return user.currentApartmentId === apartmentId ? true : false;
}

async function getAssociatedReviews(apartmentId) {
  const associatedModels = await Review.findAll({
    where: {
      apartmentId,
    },
    include: [InterestedTenant, User],
  });
  return associatedModels;
}
module.exports = {
  getPlaces,
  getPlace,
  addPlace,
  checkCurrentTenant,
  getAssociatedReviews,
};
