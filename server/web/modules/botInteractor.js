const fs = require("fs");

module.exports = (client, channelRetriever) => {

  const voicePlayer = require(__dirname + "/../../commands/commands/play-voice.js")(client, null, null);

  const sendMessage = (request, response) => {
    let message = request.body.message;
    let type = request.body.type; // user/channel
    let channelName = request.body.channel_name;
    let tts = request.body.tts;
    if(!message || message === "" || !type || type === "" || !channelName || channelName === ""){
      response.status(400);
      response.send("Missing params");
      return;
    }
    console.log("Sending " + message + " of type " + type + " to " + channelName + " with tts option " + tts);
    if(type === "channel"){
      let channel = channelRetriever.getChannelByName(channelName);
      if(channel){
        if(tts) channel.send(message, {tts: true});
        else channel.send(message, {tts: false});
        response.send("Ok");
      }
      else{
        response.status(404);
        response.send("Channel " + channelName + " not found");
      }
    }
    else if(type === "user"){
      channelRetriever.getDMChannel(channelName, function(dmChannel){
        if(dmChannel){
          if(tts) dmChannel.send(message, {tts: true});
          else dmChannel.send(message, {tts: false});
          response.send("Ok");
        }
        else{
          response.status(404);
          response.send("User " + channelName + " not found");
        }
      });
    }
    else{
      response.status(400);
      response.end("Invalid type");
    }
  }

  const getVoiceList = (request, response) => {
    fs.readdir(__dirname + "/../../commands/voice-clips", (err, files) => {
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

  const joinVoice = (request, response) => {
    console.log("Join voice request");
    let channelName = request.params.channel;
    if(!channelName){
      response.status(400);
      response.send("No channel");
      return;
    }
    let channel = channelRetriever.getChannelByName(channelName);
    if(!channel || channel.type !== "voice"){
      response.status(404);
      response.send("Channel not found or is not voice channel");
      return;
    }
    channel.join().then(connection => console.log("Joined voice channel " + channelName)).catch(console.error);
  }

  const botInteractorModule = {
    sendMessage: sendMessage,
    getVoiceList: getVoiceList,
    playVoice: playVoice,
    playYoutubeLink: playYoutubeLink,
    joinVoice: joinVoice
  };

  return botInteractorModule;
}
