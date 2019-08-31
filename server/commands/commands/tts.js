const usage = () => {
  return "!tts <text>";
}

const execute = (msgObject, params, cb) => {
  let result = {
    responseText: params.join(" "),
    tts: true
  };
  cb(result);
}

const ttsModule = {
  usage: usage,
  execute : execute
};

module.exports = ttsModule;
