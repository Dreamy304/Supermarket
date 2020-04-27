var admin = require("firebase-admin");

var serviceAccount = require("./fir-function-proj-firebase-adminsdk-6u6gz-b6b64ba9c6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-function-proj.firebaseio.com"
});
