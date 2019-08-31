const fs = require("fs");

const messagesFi = JSON.parse(fs.readFileSync(__dirname + "/../../config/messages_fi.json"));
const messagesEn = JSON.parse(fs.readFileSync(__dirname + "/../../config/messages_en.json"));

const findMessage = (type, lang) => {
  let jsonToUse = {};
  if(lang && lang.toLowerCase("fi")) jsonToUse = messagesFi;
  else jsonToUse = messagesEn;
  let msg = "";
  if(jsonToUse[type]) msg = jsonToUse[type];
  return msg;
}

module.exports = (client) => {

  const getInitMessage = lang => findMessage("init_message", lang).replace(/{name}/, client.user.username);
  const getShutdownMessage = lang => findMessage("shutdown_message", lang).replace(/{name}/, client.user.username);

  const messageRetrieverModule = {
    getInitMessage: getInitMessage,
    getShutdownMessage: getShutdownMessage
  };

  return messageRetrieverModule;
}
