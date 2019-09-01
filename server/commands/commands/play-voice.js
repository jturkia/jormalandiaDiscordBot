const fs = require("fs");
const ytdl = require("ytdl-core");

module.exports = (client, channelRetriever, messageRetriever) => {

  const resolveClipType = (param) => {
    let result = { // Return null for path, if file not found
      type: "", // can be file/youtube/url
      path: "" // resolved path (for file: __dirname + "/../voice-clips/<filename>", youtube and url: fully qualified url)
    }
    if(param.substring(0, 7) === "http://" || param.substring(0, 8) === "https://"){
      result.path = param;
      if(param.substring(7, 18) === "youtube.com" || param.substring(8, 19) === "youtube.com"
        || param.substring(7, 22) === "www.youtube.com" || param.substring(8, 23) === "www.youtube.com"
        || param.substring(7, 15) === "youtu.be" || param.substring(8, 16) === "youtu.be"){
        // Is youtube
        result.type = "youtube"
      }
      else{
        // Is url
        result.type = "url"
      }
    }
    else{
      // is file
      result.type = "file";
      let filePath = __dirname + "/../voice-clips/" + param + ".mp3";
      console.log("File path to play: " + filePath);
      if(fs.existsSync(filePath)){
        result.path = filePath;
      }
      else result.type = "arbitrary";
    }
    return result;
  }

  const usage = () => {
    return "!play-voice <clip-name/url-to-clip/youtube-link>"
  }

  const execute = (msgObject, params, cb) => {
    if(params.length == 0){
      cb(usage());
      return;
    }
    let clipType = resolveClipType(params[0]);
    if(!clipType){
      cb(null);
      return;
    }
    let voiceConnections = client.voiceConnections.array();
    console.log("Playing voice of type " + clipType.type)
    for(let i = 0; i < voiceConnections.length; i++){
      if(clipType.type === "youtube"){
        voiceConnections[i].playStream(ytdl(clipType.path, { filter: "audioonly"}));
      }
      else if(clipType.type === "url"){
        //voiceConnections[i].play(clipType.path);
      }
      else if(clipType.type === "file"){
        voiceConnections[i].playFile(clipType.path);
      }
      else{
        voiceConnections[i].playArbitraryInput(params[0]);
      }
    }
    if(clipType.type === "url") cb("No support yet for random urls");
    else cb(null);
  }

  const playModule = {
    usage: usage,
    execute: execute
  }

  return playModule;

}
