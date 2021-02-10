const XlsxPopulate = require("xlsx-populate");
const database = require('../firebase/firestore');
const { format } = require('date-fns')

const ExcelService = {

    async getLogExcel(logsList) {

console.log('excel')
console.log(logsList)

        let response = false;

XlsxPopulate.fromBlankAsync()
// TODO: fix race conditions
    .then((workbook) => {
      workbook.sheet("Sheet1").cell("A1").value("Transaction Type");
      workbook.sheet("Sheet1").cell("B1").value("Transaction Date and Time");
      workbook.sheet("Sheet1").cell("C1").value("Event Name");
      workbook.sheet("Sheet1").cell("D1").value("Event Date");
      workbook.sheet("Sheet1").cell("E1").value("Owner Name");
      workbook.sheet("Sheet1").cell("F1").value("Owner Email");
      workbook.sheet("Sheet1").cell("G1").value("Owner Phone");
      workbook.sheet("Sheet1").cell("H1").value("Owner Address");
      workbook.sheet("Sheet1").cell("I1").value("Owner City");
      workbook.sheet("Sheet1").cell("J1").value("Owner State");
      workbook.sheet("Sheet1").cell("K1").value("Owner Zipcode");
      workbook.sheet("Sheet1").cell("L1").value("Dog Call Name");
      workbook.sheet("Sheet1").cell("M1").value("Dog Sanction ID");
      workbook.sheet("Sheet1").cell("N1").value("Dog Microchip");
      workbook.sheet("Sheet1").cell("P1").value("Dog Breed");
      workbook.sheet("Sheet1").cell("Q1").value("Dog Gender");
      workbook.sheet("Sheet1").cell("R1").value("Dog DOB");
      workbook.sheet("Sheet1").cell("S1").value("Dog Registered Name");
      workbook.sheet("Sheet1").cell("T1").value("Dog Registration Papers");
      workbook.sheet("Sheet1").cell("U1").value("Dog Registration Papers Url");
      workbook.sheet("Sheet1").cell("V1").value("Secondary Name");
      workbook.sheet("Sheet1").cell("W1").value("Secondary Email");

    
      let index = 2;
      logsList.map((log, k) => {
        log.dogs.map((dog, i) => {
          // console.log(dog.registeredName);

          workbook
            .sheet("Sheet1")
            .cell(`A${index}`)
            .value(log.type);

          workbook
            .sheet("Sheet1")
            .cell(`B${index}`)
            .value(
              format(
                new Date(parseInt(log?.id)),
                "MMM do h:mm"
              )
            );
          workbook
            .sheet("Sheet1")
            .cell(`C${index}`)
            .value(
              log.eventName ? log.eventName : null
            );
          workbook
            .sheet("Sheet1")
            .cell(`D${index}`)
            .value(
              log.eventDate ? log.eventDate : null
            );
          workbook
            .sheet("Sheet1")
            .cell(`E${index}`)
            .value(
              log.fullName? log.fullName:null
            );
          workbook
            .sheet("Sheet1")
            .cell(`F${index}`)
            .value(
              log.email ? log.email:null
            );
          workbook
            .sheet("Sheet1")
            .cell(`G${index}`)
            .value(
              log.mobile? log.mobile:null
            );
          workbook
            .sheet("Sheet1")
            .cell(`H${index}`)
            .value(
              log.address ? log.address : null
            );
          workbook
            .sheet("Sheet1")
            .cell(`I${index}`)
            .value(
              log.city?log.city:null
            );
          workbook
            .sheet("Sheet1")
            .cell(`J${index}`)
            .value(
              log.state?log.state:null
            );
          workbook
            .sheet("Sheet1")
            .cell(`K${index}`)
            .value(
              log.zipcode?log.zipcode:null
            );
          workbook.sheet("Sheet1").cell(`L${index}`).value(dog.callName);
          workbook
            .sheet("Sheet1")
            .cell(`M${index}`)
            .value(dog.sanctionId ? dog.sanctionId : null);
          workbook.sheet("Sheet1").cell(`N${index}`).value(dog.microchip);
          workbook.sheet("Sheet1").cell(`P${index}`).value(dog.breed);
          workbook.sheet("Sheet1").cell(`Q${index}`).value(dog.gender);
          workbook.sheet("Sheet1").cell(`R${index}`).value(dog.dob);
          workbook.sheet("Sheet1").cell(`S${index}`).value(dog.registeredName);
          workbook
            .sheet("Sheet1")
            .cell(`T${index}`)
            .value(
              dog.registrationPapersType ? dog.registrationPapersType : null
            );
          workbook
            .sheet("Sheet1")
            .cell(`U${index}`)
            .value(
              dog.registrationPapersUrl ? dog.registrationPapersUrl : null
            );
          // workbook.sheet("Sheet1").cell(`V${index}`).value(dog.gender);
          // workbook.sheet("Sheet1").cell(`W${index}`).value(dog.gender);
          index++;
        });
      });
      // console.log(logsList);

      // Write to file.
      return workbook.toFileAsync("./src/endpoints/excel/out.xlsx");
    })
    .then(() => {
      response = true;
      
    //   res.sendFile(__dirname + "/endpoints/excel/" + "out.xlsx");
    });
    return response
    
    },
    async getEventLog(info) {
      console.log(info, 'excel spreadsheet')
      XlsxPopulate.fromBlankAsync()

      .then((workbook) => {

      workbook.sheet("Sheet1").cell("A1").value("Call Name");
      workbook.sheet("Sheet1").cell("B1").value("Registered Name");
      workbook.sheet("Sheet1").cell("C1").value("Date");
      workbook.sheet("Sheet1").cell("D1").value("Weight");
      workbook.sheet("Sheet1").cell("E1").value("Time");
      workbook.sheet("Sheet1").cell("F1").value("Owner");
      workbook.sheet("Sheet1").cell("G1").value("Sanction Registration Status");
    
      let index = 2;
     
          // console.log(dog.registeredName);

          info.map((item) => {
              console.log(item)
              console.log(item.sanctioned.length);
             

              item.sanctioned.map((dog,i) => {
                console.log(dog.times);
                console.log(dog);
                  workbook.sheet("Sheet1")
                  .cell(`A${index}`)
                  .value(dog.callName)
                  workbook.sheet("Sheet1")
                  .cell(`B${index}`)
                  .value(dog.info.dog.registeredName)
                  workbook.sheet("Sheet1")
                  .cell(`C${index}`)
                  .value(dog.times[0]?.times.date)
                  workbook.sheet("Sheet1")
                  .cell(`D${index}`)
                  .value(dog.times[0]?.times.weight)
                  workbook.sheet("Sheet1")
                  .cell(`E${index}`)
                  .value(dog.times[0]?.times.time)
                  workbook.sheet("Sheet1")
                  .cell(`F${index}`)
                  .value(dog.owner.fullName)
                  workbook.sheet("Sheet1")
                  .cell(`G${index}`)
                  .value(dog.info.dog.registrationStatus)

                  index++
              })
            
              // index + item.sanctioned.length

              item?.unsanctioned?.map((dog, i) => {
                  workbook.sheet("Sheet1")
                  .cell(`A${index}`)
                  .value(dog.callName)
                  workbook.sheet("Sheet1")
                  .cell(`B${index}`)
                  .value(dog.registeredName)
                 
                  workbook.sheet("Sheet1")
                  .cell(`F${index}`)
                  .value(dog.owner.fullName)
                  index++
              })

              
          })
          return workbook.toFileAsync("./src/endpoints/excel/event.xlsx")
          })

     
    }
}


module.exports = ExcelService
