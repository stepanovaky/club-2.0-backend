require("dotenv").config();
const nodemailer = require("nodemailer");
const Email = require("email-templates");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// transporter.use(
//   "compile",
//   hbs({
//     viewEngine: "express-handlebars",
//     viewPath: "views1",
//     extName: ".hbs",
//   })
// );

// let mailOptions = {
//     from: 'cfsracingclub@gmail.com',
//     to: 'psyckalla@gmail.com',
//     subject: 'Testing and testing',
//     text: 'it worked!' 
// }

const email = new Email({
  views: {
    root: "./src/templates",
    options: { extension: "ejs" },
  },
  message: {
    from: "cfsracingclub@gmail.com",
  },
  preview: false,
  send: true,
  transport: transporter,
});

module.exports = email;
