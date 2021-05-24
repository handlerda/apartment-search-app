// backend/routes/api/session.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

//get nearby apartments

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    console.log(req.query);
    const lat = req.query.lat;
    const lon = req.query.lon;
    res.json({
      lat,
      lon,
    });
  })
);

module.exports = router;
