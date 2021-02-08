const validationClass = require("../validation/validation-class");

const ValidationServices = {
  async validate(data) {
    const info = new validationClass();
    const infoAPI = info.validateApiInfo(data);
    const infoDatabase = info.validateDatabaseInfo(data);
  },
};

module.exports = ValidationServices;
