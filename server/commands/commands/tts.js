const usage = () => {
  return "!tts <text>";
}

const execute = (msgObject, params) => {
  let result = {
    responseText: params.join(" "),
    tts: true
  };
  return result;
}

const ttsModule = {
  usage: usage,
  execute : execute
};

module.exports = ttsModule;
