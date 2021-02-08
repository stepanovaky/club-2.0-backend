const { deleteTheDog } = require("../firebase/firestore");
const database = require("../firebase/firestore");

const DogService = {
  async findDogByCallName(callName) {
    if (callName) {
      const dog = await database.findDogById(callName);

      return dog;
    }
  },
  async findDogByOther(data) {
    if (data) {
      const dog = await database.findDog(data);
      return dog;
    }
  },
  async updateDog(data) {
    database.updateDog(data);
  },
  async deleteDog(data) {
    database.deleteTheDog(data.data);
  },
  async findOwnerByEmail(email) {
    const owner = await database.findOwnerByTheEmail(email);
    return owner;
  },
  async updateOwner(owner) {
    await database.updateTheOwner(owner);
  },
  async deleteOwner(owner) {
    await database.deleteTheOwner(owner);
  },
};

module.exports = DogService;
