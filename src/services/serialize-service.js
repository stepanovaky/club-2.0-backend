const xss = require("xss");
const getYear = require("date-fns/getYear");
const { nanoid } = require("nanoid");

// registrationStatus = 'current' || 'expired' || 'renewed'

const SerializeService = {
  async serializeOwner(data) {
    console.log(data, "serialize owner");
    const ownerInfo = {
      fullName: xss(
        data.firstName.toLowerCase() + " " + data.lastName.toLowerCase()
      ),
      email: xss(data.email.toLowerCase()),
      mobile: xss(data.mobile),
      landline: xss(data.landline),
      address: xss(data.addressOne + " " + data.addressTwo),
      zipcode: xss(data.zipCode),
      city: xss(data.city),
      state: xss(data.state),
    };
    return ownerInfo;
  },
  async serializeDog(data) {
    console.log(data, "serialize dogs");
    const expirationYear = getYear(new Date());
    const expirationDate = new Date(expirationYear, 11, 31);
    const serializedDogs = data.map((dog, index) => {
      console.log(dog, "serialize dog");
      return {
        registeredName: xss(dog.registeredName.toLowerCase()),
        callName: xss(dog.callName.toLowerCase()),
        registrationNumber: xss(dog.registrationNumber.toLowerCase()),
        microchip: xss(dog.microchip),
        breed: xss(dog.breed.toLowerCase()),
        dob: xss(dog.dob),
        gender: xss(dog.gender),
        registrationPapers: xss(dog.registrationPapers),
        registrationPapersUrl: xss(dog.pdfUrl ? dog.pdfUrl : null),
        exp: expirationDate,
        sanctionId: nanoid(4).toLowerCase(),
        primaryOwners: [],
        secondaryOwners: dog.secondaryOwner
          ? dog.secondaryOwner.map((owner) => {
              return {
                fullName: xss(owner.firstName + " " + owner.lastName),
                email: xss(owner.email),
              };
            })
          : null,
        registrationStatus: "current",
      };
    });
    return serializedDogs;
  },
};

module.exports = SerializeService;
