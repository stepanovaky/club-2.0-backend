const database = require("../firebase/firestore");

const LogService = {
  async getAllLogs() {
    const logs = await database.getLogs();
    return logs;
  },
};

module.exports = LogService;
