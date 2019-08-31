module.exports = (channelRetriever, messageRetriever) => {
  const fs = require("fs");

  let commandList = {};

  let list = fs.readdirSync(__dirname + "/commands");
  for(let i = 0; i < list.length ; i++){
    let name = list[i].replace(/.js/, "");
    let command = require(__dirname + "/commands/" + list[i]);
    if(typeof command === "function") commandList[name] = require(__dirname + "/commands/" + list[i])(channelRetriever, messageRetriever);
    else commandList[name] = require(__dirname + "/commands/" + list[i]);
  }

  return commandList;
}
