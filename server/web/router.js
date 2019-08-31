const authenticator = require(__dirname + "/authenticator.js");

module.exports = () => {
  const Express = require("express");
  const router = Express.Router();

  router.use("/", authenticator.authenticate, Express.static(__dirname + "/../../public"));

  return router;
}
