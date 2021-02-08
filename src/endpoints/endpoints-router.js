const {
  registrationRouter,
  jsonParser,
  dogRouter,
  eventsRouter,
  ownerRouter,
  logRouter,
} = require("../express");
const ValidationServices = require("../services/1. validation-services");
const FirstTimeRegistrationService = require("../services/firstTimeRegistration-service");
const EventsService = require("../services/events-services");
const DogService = require("../services/dog-service");
const LogService = require("../services/log-service");
const OwnerService = require("../services/owner-service");

registrationRouter
  .route("/api/first/registration")
  .post(jsonParser, async (req, res, next) => {
    console.log(req.body.data.dogs, "first time registration endpoint");
    // console.log(req.headers);
    ValidationServices.validate(req.body.data);
    FirstTimeRegistrationService.first(req.body.data);

    res.status(200).json({ message: "success" });
  });

registrationRouter
  .route("/api/sanctioned/event/registration")
  .post(jsonParser, async (req, res, next) => {
    // console.log(req.body, "sanctioned registration");
    EventsService.addSanctionedRegistration(req.body);
  });

registrationRouter
  .route("/api/unsanctioned/event/registration")
  .post(jsonParser, async (req, res, next) => {
    console.log(req.body);
    EventsService.addUnsanctionedRegistration(req.body);
  });

eventsRouter.route("/api/get/events").get(async (req, res, next) => {
  const events = await EventsService.getAllEvents();
  res.status(200).json({ events });
});

eventsRouter
  .route("/api/update/events")
  .put(jsonParser, async (req, res, next) => {
    const data = req.body;
    const updateData = await EventsService.updateEvents(data);
  });

eventsRouter
  .route("/api/add/event")
  .post(jsonParser, async (req, res, next) => {
    await EventsService.addEvent(req.body);
  });

ownerRouter.route("/api/find/owner").get(async (req, res, next) => {
  const ownerToFind = req.headers["data"];
  const parsedOwner = JSON.parse(ownerToFind);
  if (parsedOwner.findOwner === "email") {
    const owner = await DogService.findOwnerByEmail(parsedOwner.ownerItem);
    res.status(201).json({ owner });
  }
});
//owner service broke, moved everything into dog service for temp
ownerRouter
  .route("/api/update/owner")
  .put(jsonParser, async (req, res, next) => {
    await DogService.updateOwner(req.body);
  });

ownerRouter
  .route("/api/delete/owner")
  .put(jsonParser, async (req, res, next) => {
    await DogService.deleteOwner(req.body);
  });

dogRouter.route("/api/find/dog").get(async (req, res, next) => {
  const dogToFind = req.headers["data"];
  const parsedDog = JSON.parse(dogToFind);
  if (parsedDog.findDogs === "callName * preferred") {
    const dog = await DogService.findDogByCallName(parsedDog.dogItem);
    res.status(200).json({ dog });
  } else {
    const dog = await DogService.findDogByOther(parsedDog);
    console.log(dog, "sanctionid");
    res.status(200).json({ dog });
  }
});

dogRouter.route("/api/update/dog").put(jsonParser, async (req, res, next) => {
  DogService.updateDog(req.body);
});

dogRouter.route("/api/delete/dog").put(jsonParser, (req, res, enxt) => {
  DogService.deleteDog(req.body);
});

logRouter.route("/api/get/all/logs").get(async (req, res, next) => {
  const log = await LogService.getAllLogs();
  res.status(200).json({ log });
  console.log(log);
});

module.exports = {
  registrationRouter,
  eventsRouter,
  dogRouter,
  logRouter,
  ownerRouter,
};
