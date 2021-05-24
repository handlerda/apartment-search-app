//apartment controllers // helper functions
require("dotenv").config({ path: "../../.env" });
const axios = require("axios");
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function getPlaces(lat, lon) {
  const request = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${GOOGLE_API_KEY}&query=apartments&locationbias=point${lat},${lon}`;
  const response = await axios.get(request);
  const data = await response.data;
  return data;
}

module.exports = { getPlaces };
