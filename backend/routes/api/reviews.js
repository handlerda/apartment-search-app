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
  Review,
} = require("../../db/models");
const { addReview, addInterestedTenant } = require("../controllers/review");

const router = express.Router();

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    // object to create a new review
    const userId = req.user.dataValues.id;
    console.log(req.body);
    const {
      title,
      review,
      apartmentId,
      isInterested,
      text,
      email,
      phone,
      amount,
      other,
      paymentPreference,
    } = req.body.payload;
    //review payload
    const reviewInfo = {
      authorId: userId,
      title,
      body: review,
      apartmentId,
      anonymous: false,
    };
    // create new review
    const newReview = await addReview(reviewInfo);
    // if the new review was inserted and there was not an error check to see if the user is interested
    if (typeof newReview !== Error) {
      // check if the user is interested
      if (isInterested === true) {
        // create an interested tenant
        const interestedTenantInfo = {
          reviewId: newReview.id,
          text,
          email,
          phone,
          requestedAmount: amount,
          other,
          paymentPreference,
        };
        const newInterestedTenant = await addInterestedTenant(
          interestedTenantInfo
        );
        console.log(newInterestedTenant);
        if (typeof newInterestedTenant !== Error) {
          res.json({
            created: {
              review: newReview.id,
              interestedTenant: newInterestedTenant.id,
            },
          });
        } else {
          // the newInterestedTenant was not created -- returned an error
          res.json({
            error: newInterestedTenant,
          });
        }
      } else {
        // do no create an interested tenant and return
        res.json({
          created: "review",
          reviewId: newReview.id,
        });
      }
    }
  })
);

// authorId,
//       apartmentId,
//       title,
//       body,
//       anonymous,

module.exports = router;

// res.json({
//   status: "created",
//   reviewId: newReview.id,
// });
