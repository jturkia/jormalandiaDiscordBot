const usage = () => {
  return "!echo <text>";
}

const execute = (msgObject, params, cb) => {
  let txt = params.join(" ");
  cb(txt);
}

const echoModule = {
  usage: usage,
  execute: execute
};

module.exports = echoModule;
