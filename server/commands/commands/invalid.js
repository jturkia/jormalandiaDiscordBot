const fs = require("fs");

const usage = () => {
  return "!invalid";
}

const execute = (msgObject, params) => {
  let txt = "Invalid command " + params[0] + "! Available commands: \n";

  let list = fs.readdirSync(__dirname + "/");
  for(let i = 0; i < list.length ; i++){
    if(list[i].toLowerCase() === "invalid.js") continue;
    txt += "- " + require(__dirname + "/" + list[i]).usage() + "\n";
  }

  return txt;
}

const invalidModule = {
  usage: usage,
  execute: execute
}

module.exports = invalidModule;
