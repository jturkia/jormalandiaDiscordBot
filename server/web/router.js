module.exports = (client, channelRetriever) => {

  const authenticator = require(__dirname + "/modules/authenticator.js");
  const dataHandler = require(__dirname + "/modules/dataHandler.js");
  const botInteractor = require(__dirname + "/modules/botInteractor.js")(client, channelRetriever);
  const uploader = require(__dirname + "/modules/uploader.js");
  const infoGetter = require(__dirname + "/modules/infoGetter.js")(client);

  const Express = require("express");
  const router = Express.Router();

  router.use("/", authenticator.authenticate, Express.static(__dirname + "/../../public"));

  router.get("/api/suggestion/:id", authenticator.authenticate, dataHandler.getSuggestion);
  router.get("/api/suggestions", authenticator.authenticate, dataHandler.getSuggestions);
  router.post("/api/suggestion/update/:id", authenticator.authenticate, dataHandler.updateSuggestion);
  router.delete("/api/suggestion/:id", authenticator.authenticate, dataHandler.deleteSuggestion);

  router.get("/api/channels", authenticator.authenticate, infoGetter.getChannels);
  router.get("/api/users", authenticator.authenticate, infoGetter.getUsers);

  router.post("/api/bot/message", authenticator.authenticate, botInteractor.sendMessage);
  router.get("/api/bot/voices", authenticator.authenticate, botInteractor.getVoiceList);
  router.get("/api/bot/play-voice/:filename", authenticator.authenticate, botInteractor.playVoice);
  router.get("/api/bot/play-youtube/:link", authenticator.authenticate, botInteractor.playYoutubeLink);
  router.get("/api/bot/join-voice/:channel", authenticator.authenticate, botInteractor.joinVoice);

  router.post("/api/upload/mp3-url/:filename", authenticator.authenticate, uploader.uploadMP3Url);



  return router;
}
