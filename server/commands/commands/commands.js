const fs = require("fs");

const usage = () => {
  return "!commands";
}

const execute = (msgObject, params, cb) => {
  let txt = "Available commands: \n";

  let list = fs.readdirSync(__dirname + "/");
  for(let i = 0; i < list.length ; i++){
    if(list[i].toLowerCase() === "invalid.js") continue;
    let command = require(__dirname + "/" + list[i]);
    if(typeof command === "function") command = command(null);
    if(command.usage && typeof command.usage === "function") txt += "- " + command.usage() + "\n";
  }
  cb(txt);
}

const invalidModule = {
  usage: usage,
  execute: execute
}

module.exports = invalidModule;
