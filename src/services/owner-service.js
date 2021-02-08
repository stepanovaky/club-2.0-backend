const database = require("../firebase/firestore");

const OwnerService = {
  async findOwnerByEmail(email) {
    const owner = await database.findOwnerByTheEmail(email);
    return owner;
  },
};

module.exports = OwnerService;
