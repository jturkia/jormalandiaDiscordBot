const fs = require("fs");

let commandList = {};

let list = fs.readdirSync(__dirname + "/commands");
for(let i = 0; i < list.length ; i++){
  let name = list[i].replace(/.js/, "");
  commandList[name] = require(__dirname + "/commands/" + list[i]);
}

module.exports = commandList;
