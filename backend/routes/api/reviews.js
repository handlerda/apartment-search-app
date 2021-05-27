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

const router = express.Router();

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const body = req.body;
    res.json({
      body,
    });
  })
);

module.exports = router;
