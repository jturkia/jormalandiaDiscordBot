module.exports = (client, channelRetriever, messageRetriever) => {
  const usage = () => {
    return "!join-voice <channel name>";
  }

  const execute = (msgObject, params, cb) => {
    if(params.length === 0) cb(usage());
    else{
      let channel = channelRetriever.getChannelByName(params[0], "voice");
      if(!channel || channel.type !== "voice") cb("No voice channel " + params[0] + " found");
      else{
        channel.join().then(connection => console.log("Joined voice channel " + params[0])).catch(console.error);
        cb(null);
      }
    }

  }

  const echoModule = {
    usage: usage,
    execute: execute
  };

  return echoModule;
}
