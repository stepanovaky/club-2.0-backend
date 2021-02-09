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
const ExcelService = require('../services/excel-service')

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

  eventsRouter
  .route('/api/info/event')
  .get(async(req, res, next) => {

    console.log(JSON.parse(req.headers['data']))

    const response = await EventsService.getOneEventRegistration(JSON.parse(req.headers['data']).eventId)

    await ExcelService.getEventLog(response);
    res.sendFile(__dirname + '/excel/' + 'event.xlsx')
    // res.status(200).json({response})
     
  }) 

  eventsRouter
  .route('/api/check/event') 
  .get( async (req, res, next) => {
    const parsedData = JSON.parse(req.headers['data'])
    console.log(parsedData);
    const response = await EventsService.checkEventRegistration(parsedData.eventId, parsedData)
    if (response) {
      res.status(409).json({response})
    } else {
      res.status(204)
    }
  })

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

logRouter.route('/api/get/all/logs/excel').get(async (req, res, next) => {
  const log = await LogService.getAllLogs();
  const response = await ExcelService.getLogExcel(log)
  console.log('here')
  res.sendFile(__dirname + "/excel/" + "out.xlsx")

})

module.exports = {
  registrationRouter,
  eventsRouter,
  dogRouter,
  logRouter,
  ownerRouter,
};
