require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const {
  registrationRouter,
  eventsRouter,
  dogRouter,
  ownerRouter,
  logRouter,
} = require("./endpoints/endpoints-router");
const requestIp = require("request-ip");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 15 minutes
  max: 2, // limit each IP to 100 requests per windowMs
});

const app = express();
// app.use(limiter);
// app.use("/api/first/", limiter);

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use(requestIp.mw());

app.use(registrationRouter);
app.use(eventsRouter);
app.use(ownerRouter);
app.use(dogRouter);
app.use(logRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
