// backend/routes/api/session.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User, Apartment } = require("../../db/models");
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
    console.log(req);
    let apartmentInDB = null;
    const id = req.params.id;
    console.log(id);
    //check if apartment is in db
    const apartment = await Apartment.findOne({ where: { googlePlaceId: id } });
    //set apartmentInDB
    if (apartment) {
      apartmentInDB = true;
    } else {
      apartmentInDB = false;
    }
    const placeDetails = await getPlace(id);
    res.json(placeDetails);
  })
);

module.exports = router;
