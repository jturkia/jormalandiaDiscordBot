const fs = require("fs");

module.exports = (client) => {

  const voicePlayer = require(__dirname + "/../commands/commands/play-voice.js")(client, null, null);

  const sendMessage = (requets, response) => {

  }

  const getVoiceList = (request, response) => {
    fs.readdir(__dirname + "/../commands/voice-clips", (err, files) => {
      if(err){
        console.error(err);
        response.status(500);
        response.send("Error reading voice list");
      }
      else{
        response.status(200);
        response.json(files);
      }
    });
  }

  const playVoice = (request, response) => {
    let filename = request.params.filename;
    if(!filename){
      response.status(400);
      response.send("Filename missing");
      return;
    }
    filename = filename.replace(/\.mp3/, "");
    console.log("Playing " + filename);
    voicePlayer.execute(null, [filename], () => {
      response.send("Ok");
    });
  }

  const playYoutubeLink = (request, response) => {
    let link = request.params.link;
    if(!link){
      response.status(400);
      response.send("Link missing");
      return;
    }
    console.log("Playing " + link);
    voicePlayer.execute(null, [link], () => {
      response.send("Ok");
    });
  }

  const botInteractorModule = {
    sendMessage: sendMessage,
    getVoiceList: getVoiceList,
    playVoice: playVoice,
    playYoutubeLink: playYoutubeLink
  };

  return botInteractorModule;
}
