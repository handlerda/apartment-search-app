// backend/routes/api/session.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const {
  User,
  Apartment,
  InterestedApartment,
  Address,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { getPlaces, getPlace } = require("../controllers/apartment");
const router = express.Router();

//get nearby apartments

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const places = await getPlaces(lat, lon);
    console.log(places);
    res.json(places);
  })
);

router.get(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    // console.log(req.User.dataValues.id);
    let apartmentInDB = null;
    let isInterestedApartment = null;
    const id = req.params.id;
    const userId = req.user.dataValues.id;
    //check if apartment is in db
    const apartment = await Apartment.findOne({ where: { googlePlaceId: id } });
    //set apartmentInDB
    if (apartment) {
      const interestedApartment = await InterestedApartment.findOne({
        apartmentId: apartment.id,
        userId,
      });
      if (interestedApartment) {
        isInterestedApartment = true;
      } else {
        isInterestedApartment = false;
      }
      apartmentInDB = true;
    } else {
      apartmentInDB = false;
      isInterestedApartment = false;
    }
    const placeDetails = await getPlace(id);
    Object.assign(placeDetails, { apartmentInDB, isInterestedApartment });
    res.json(placeDetails);
  })
);

router.post(
  "/:id/interested",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const googlePlaceId = req.params.id;
    const { userId } = req.body;
    const apartment = await Apartment.findOne({ where: { googlePlaceId } });
    if (apartment) {
      try {
        InterestedApartment.create({
          apartmentId: apartment.id,
          userId,
        });
        res.json({ added: true, userId, apartmentId });
      } catch (error) {
        res.json({ error });
      }
    } else {
      // try {
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
      console.log(apartment.id);
      const interestedApartment = await InterestedApartment.create({
        userId,
        apartmentId: apartment.id,
      });
      res.json({
        updated: true,
        interestedApartment: true,
        userId,
        apartmentId: apartment.id,
      });
    }

    // } catch (error) {
    //   res.json({ error });
    // }
  })
);

module.exports = router;
