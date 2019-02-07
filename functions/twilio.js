const twilio = require("twilio");

const accountSid = "AC60cf1d69dd2f6f3bcc960bd6e16437c2";
const authToken = "a9a43cb44c20e17e0abc16a455e0faee";

module.exports = new twilio.Twilio(accountSid, authToken);
