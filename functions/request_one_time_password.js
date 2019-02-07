const admin = require("firebase-admin");

module.exports = function(req, res) {
  if (!req.body.phone) {
    return res.status(422).send({ error: "You must provide a phone number" });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, ""); //turning num to a string
  admin.auth().getUser(phone); //finding the user model
};
