//dogs and owners are sent here so
//that everybody has everyone's id
const validateAPIInfoService = require("./services/Validation/validateAPIInfo-service");
const FirstTime = require("./services/RegisterFirstTime/registerOwner-service");

const Relationships = {
  async parseData(data) {
    console.log(data);
    console.log(data.data);
    // console.log(data.dogs);

    const owner = data.data.owner;
    const dogs = data.data.dogs;
    const secondaryOwner = data.data.secondaryOwner;
    const validated = validateAPIInfoService.validateRegistration(owner, dogs);

    if (validated) {
      await dogs.map((dog, index) => {
        secondaryOwner.map((secondary, k) => {
          if (index === k) {
            console.log(secondary);
            dog.secondaryOwners = secondary.secondary;
            // dog[index].secondaryOwners = secondary[k]
          }
        });
      });
      FirstTime.storeOwner(owner, dogs);
      FirstTime.storeDog(owner, dogs);
    }
  },
};

module.exports = Relationships;
