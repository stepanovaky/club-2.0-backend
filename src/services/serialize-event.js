const xss = require("xss");

const SerializeEvents = {
  async serializeUpdateEvents(data) {
    console.log(data, "data");
    const info = {
      eventId: xss(data.eventOption),
      eventName: xss(data.eventName),
      startDate: xss(data.startDate),
      sanctionedPrice: xss(data.sanctionedPrice),
      unsanctionedPrice: xss(data.unsanctionedPrice),
      eventPdfUrl: xss(data.eventPdfUrl),
    };
    console.log(info, "serialized data");
    return info;
  },
};

module.exports = SerializeEvents;
