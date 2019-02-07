const admin = require("firebase-admin"); //window to data on firebase

module.exports = function(req, res) {
  if (!req.body.phone || !req.body.code) {
    return res.status(422)({ error: "Phone and code must be provided" });
  }
  const phone = String(req.body.phone).replace(/[^\d]/g, ""); //turning num to a string
  const code = parseInt(req.body.code); //converts string to integer

  admin
    .auth()
    .getUser(phone)
    .then(() => {
      const ref = admin.database().ref("user/" + phone);
      ref.on("value", snapshot => {
        ref.off(); //necessary for google cloud functions
        const user = snapshot.val();
        if (user.code !== code || !user.codeValid) {
          return res.status(422).send({ error: "Code not valid" });
        }
        ref.update({ codeValid: false });
        admin
          .auth()
          .createCustomToken(phone)
          .then(token => res.send({ token }));
      });
    })
    .catch(err => res.status(422).send({ error: err }));
};
