module.exports = (client) => {

  const authenticator = require(__dirname + "/authenticator.js");
  const dataHandler = require(__dirname + "/dataHandler.js");
  const botInteractor = require(__dirname + "/botInteractor.js")(client);

  const Express = require("express");
  const router = Express.Router();

  router.use("/", authenticator.authenticate, Express.static(__dirname + "/../../public"));

  router.get("/api/suggestion/:id", authenticator.authenticate, dataHandler.getSuggestion);
  router.get("/api/suggestions", authenticator.authenticate, dataHandler.getSuggestions);
  router.post("/api/suggestion/update/:id", authenticator.authenticate, dataHandler.updateSuggestion);
  router.delete("/api/suggestion/:id", authenticator.authenticate, dataHandler.deleteSuggestion);

  router.post("/api/bot/message", authenticator.authenticate, botInteractor.sendMessage);
  router.get("/api/bot/voices", authenticator.authenticate, botInteractor.getVoiceList);
  router.get("/api/bot/play-voice/:filename", authenticator.authenticate, botInteractor.playVoice);
  router.get("/api/bot/play-youtube/:link", authenticator.authenticate, botInteractor.playYoutubeLink);

  return router;
}
