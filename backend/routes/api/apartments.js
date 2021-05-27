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
const {
  getPlaces,
  getPlace,
  addPlace,
  checkCurrentTenant,
  getAssociatedReviews,
} = require("../controllers/apartment");
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
    let apartmentId = null;
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
      apartmentId = apartment.id;
      if (interestedApartment) {
        isInterestedApartment = true;
      } else {
        isInterestedApartment = false;
      }
      apartmentInDB = true;
    } else {
      // adds apt on creation
      const apartment = await addPlace(id);
      apartmentId = apartment.id;
      apartmentInDB = true;
      isInterestedApartment = false;
    }

    const placeDetails = await getPlace(id);
    console.log(apartmentId);
    const currentTenant = await checkCurrentTenant(userId, apartmentId);
    //get associated reviews and interested
    const associatedReviews = await getAssociatedReviews(apartmentId);
    console.log(`WHERE IS THIS LOGGING`);
    //console.log(associatedReviews);

    Object.assign(placeDetails, {
      apartmentInDB,
      isInterestedApartment,
      currentTenant,
      apartmentId,
      associatedReviews,
    });
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
      const apartment = addPlace(googlePlaceId);
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
  })
);

router.delete(
  "/:id/interested",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const googlePlaceId = req.params.id;
    const { userId } = req.body;
    const apartment = await Apartment.findOne({ where: { googlePlaceId } });
    const interestedApartment = await InterestedApartment.destroy({
      where: {
        userId,
        apartmentId: apartment.id,
      },
    });
    res.json({
      status: "deleted",
      userId,
      apartmentId: apartment.id,
      interestedApartmentId: interestedApartment.id,
    });
  })
);

router.post(
  "/:id/tenant",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const googlePlaceId = req.params.id;
    const userId = req.user.dataValues.id;
    const user = await User.findOne({ where: { id: userId } });
    const apartment = await Apartment.findOne({ where: { googlePlaceId } });
    if (apartment) {
      // add the apt id to the user
      user.currentApartmentId = apartment.id;
      await user.save();
      res.json({
        userId,
        currentApartment: apartment.id,
      });
    } else {
      // added apartment
      const newApartment = await addPlace(googlePlaceId);
      user.currentApartmentId = newApartment.id;
      await user.save();
      res.json({
        userId,
        currentApartment: newApartment.id,
      });
    }
  })
);

router.delete(
  "/:id/tenant",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const googlePlaceId = req.params.id;
    const userId = req.user.dataValues.id;
    const user = await User.findOne({ where: { id: userId } });
    user.currentApartmentId = null;
    await user.save();
    res.json({
      userId,
      apartmentId: googlePlaceId,
      status: "deleted",
    });
  })
);

module.exports = router;
