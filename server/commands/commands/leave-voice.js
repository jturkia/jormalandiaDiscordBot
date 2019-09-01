module.exports = (client, channelRetriever, messageRetriever) => {
  const usage = () => {
    return "!leave-voice <opt: channel name>";
  }

  const execute = (msgObject, params, cb) => {
    let voiceConnections = client.voiceConnections.array();
    for(let i = 0; i < voiceConnections.length; i++){
      if(params.length > 0){
        if(voiceConnections[i].name === params[0]){
          voiceConnections[i].disconnect();
          break;
        }
      }
      else voiceConnections[i].disconnect();
    }
    cb(null);
  }

  const echoModule = {
    usage: usage,
    execute: execute
  };

  return echoModule;
}
