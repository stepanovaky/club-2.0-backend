const email = require("../nodemailer");

const EmailService = {
  async firstRegistration(owner, dogs) {
    email
      .send({
        template: "test",
        message: {
          to: owner.email,
        },
        locals: {
          name: dogs.map((dog) => {
            return dog;
          }),
        },
      })
      .then(console.log);
  },
  async sanctionedEventRegistration(eventName, dogs, eventDate, owner) {
    email
      .send({
        template: "sanctioned-event-registration",
        message: {
          to: owner,
        },
        locals: {
          name: dogs,
          eventName: eventName,
          eventDate: eventDate,
        },
      })
      .then(console.log);
  },
  async unsanctionedEventRegistration(eventName, dogs, eventDate, owner) {
    email
      .send({
        template: "unsanctioned-event-registration",
        message: {
          to: owner,
        },
        locals: {
          name: dogs,
          eventName: eventName,
          eventDate: eventDate,
        },
      })
      .then(console.log);
  },
};

module.exports = EmailService;
