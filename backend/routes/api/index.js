//import router
//look at route
const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const apartmentsRouter = require("./apartments");

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/apartments", apartmentsRouter);

// testing api routes

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
