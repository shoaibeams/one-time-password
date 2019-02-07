const admin = require("firebase-admin");
module.exports = function(req, res) {
  //verify the user provided a phone
  if (!req.body.phone) {
    return res.status(422).send({ error: "Bad input" });
  }

  //format the phone number to remove dashes and parens
  const phone = String(req.body.phone).replace(/[^\d]/g, ""); //turning num to a string

  //create a new user account using that phone number
  admin
    .auth()
    .createUser({ uid: phone }) //uid--token that identifies a user; async req
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));

  //respond to the user request saying the account was made
};
