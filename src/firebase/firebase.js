var firebase = require("firebase/app");
const admin = require("firebase-admin");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

var firebaseConfig = {
  apiKey: "AIzaSyAmX7NztIP6rSPxyI4MQZuucgyjw3poQWY",
  authDomain: "cfs-racing-club.firebaseapp.com",
  databaseURL: "https://cfs-racing-club-default-rtdb.firebaseio.com",
  projectId: "cfs-racing-club",
  storageBucket: "cfs-racing-club.appspot.com",
  messagingSenderId: "398840133886",
  appId: "1:398840133886:web:252f27385dba8acfe8cdaf",
  measurementId: "G-L938VST90Z",
};

firebase.initializeApp(firebaseConfig);
var serviceAccount = require("../cfs-racing-club-firebase-adminsdk-5skz5-7aebfa6b95.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cfs-racing-club-default-rtdb.firebaseio.com",
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

module.exports = db;
