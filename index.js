module.exports = Object.assign(
  require("./controller/ServerDB.js"),
  require("./controller/SendMailNow.js"),
  require("sendotp")
);
