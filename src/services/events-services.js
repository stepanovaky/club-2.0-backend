const database = require("../firebase/firestore");
const EmailService = require("./email-service");
const SerializeEvents = require("./serialize-event");

const EventsService = {
  async addEvent(data) {
    await database.addTheEvent(data);
  },
  async getAllEvents() {
    const eventsList = await database.getEvents();
    return eventsList;
  },
  async updateEvents(data) {
    const serializedData = await SerializeEvents.serializeUpdateEvents(data);

    const res = await database.updateEvents(serializedData);
  },

  async checkEventRegistration(eventId, data) {
    
    const event = await database.getOneEvent(eventId)
    if (data.sanctioned) {
      const info = await database.isEventRegistered(event[0], 'sanctioned', data.sanctioned)
      const toBeRegistered = data.sanctioned
      console.log(info);
      const previouslyRegistered = []
      for (dog of info) {
        for (item of toBeRegistered) {
          if (item.callName === dog.dog.callName) {
          previouslyRegistered.push(item)
        }
        }
      }
      return previouslyRegistered
    } else if (data.unsanctioned) {
      const info = database.isEventRegistered(event[0],
      'unsanctioned', data.unsanctioned)
       const toBeRegistered = data.unsanctioned
      console.log(info);
      const previouslyRegistered = []
      for (dog of info) {
        for (item of toBeRegistered) {
          if (item.callName === dog.dog.callName) {
          previouslyRegistered.push(item)
        }
        }
      }
      return previouslyRegistered

    }
    
  },

  async addSanctionedRegistration(data) {
    console.log(data);
    console.log(data.eventId);
    const event = await database.getOneEvent(data.eventId);
    const owner = await database.getDogsOwner(data.addedDogs);
    database.logEvent(owner, data.addedDogs, "Sanctioned Registration");
    
    EmailService.sanctionedEventRegistration(
      event[1],
      data.addedDogs,
      event[2],
      owner
    );
    database.addSanctionedRegistrationToEvent(event[0], data.addedDogs);
  },
  async addUnsanctionedRegistration(data) {
    console.log(data);
    console.log(data.eventId);
    const event = await database.getOneEvent(data.eventId);
    database.logEvent(data.owners[0], data.dogs, "Unsanctioned Registration");
    
    EmailService.unsanctionedEventRegistration(
      event[1],
      data.dogs,
      event[2],
      data.owners[0].email
    );
    database.addUnsanctionedRegistrationToEvent(
      event[0],
      data.owners,
      data.dogs
    );
  },
};

module.exports = EventsService;
