const usage = () => {
  return "!echo <text>";
}

const execute = (msgObject, params) => {
  let txt = params.join(" ");
  return txt;
}

const echoModule = {
  usage: usage,
  execute: execute
};

module.exports = echoModule;
