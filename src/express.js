const express = require("express");
const registrationRouter = express.Router();
const eventsRouter = express.Router();
const dogRouter = express.Router();
const ownerRouter = express.Router();
const logRouter = express.Router();
const jsonParser = express.json();

module.exports = {
  registrationRouter,
  eventsRouter,
  dogRouter,
  logRouter,
  jsonParser,
  ownerRouter,
};
