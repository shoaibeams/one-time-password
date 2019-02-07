const admin = require("firebase-admin"); //window to data on firebase
const functions = require("firebase-functions");
const createUser = require("./create_user");
const requestOneTimePassword = require("./request_one_time_password");
const verifyOneTimePassword = require("./verify_one_time_password");

//setting up a service account
const serviceAccount = require("./service_account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-b79e4.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(
  requestOneTimePassword
);

exports.verifyOneTimePassword = functions.https.onRequest(
  verifyOneTimePassword
);
