const usage = () => {
  return "!tts <text>";
}

const execute = (msgObject, params, cb) => {
  let channel = msgObject.channel;
  channel.send(params.join(" "), {tts: true}).then( message => console.log("Sent tts message to channel " + channel.name)).catch(console.error);
  cb(null);
}

const ttsModule = {
  usage: usage,
  execute : execute
};

module.exports = ttsModule;
