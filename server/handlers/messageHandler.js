const commandList = require(__dirname + "/../commands");

const printMessageInfo = (msg) => {
  console.log("---Message start---");
  console.log("Author: " + msg.author.username);
  console.log("Channel: " + msg.channel.name);
  let mentionedUsers = msg.mentions.users.array();
  console.log("Mentions:");
  for(let i = 0; i < mentionedUsers.length; i++){
    console.log("- " + mentionedUsers[i].username);
  }
  console.log("TTS: " + msg.tts);
  console.log("Content: " + msg.content);
  console.log("---Message stop---");
}

const getAndExecuteCommand = (msg) => {
  let txt = msg.content;
  if(txt.length >= 2 && txt.charAt(0) === "!"){
    let splitted = txt.split(" ");
    let cmd = splitted[0].substring(1);
    console.log("Checking for command " + cmd);
    if(commandList[cmd] && cmd.toLowerCase() !== "invalid") {
      let params = [];
      if(splitted.length > 1) {
        splitted.shift();
        params = splitted;
      }
      if(commandList[cmd].execute && typeof commandList[cmd].execute === "function") {
        console.log("Command " + cmd + " found! Executing with params " + params)
        return commandList[cmd].execute(msg, params);
      }
      else{
        console.log("Command " + cmd + " was found, but 'execute' was not found to be function for that command");
        return commandList["invalid"].execute(msg, params);
      }
    }
    else {
      console.log("Command " + cmd + " not found, executing invalid command")
      let params = [];
      params.push(cmd);
      return commandList["invalid"].execute(msg, params);
    }
  }
  else return null;
}

const handleMessage = (msg) => {
  printMessageInfo(msg);
  let commandResult = getAndExecuteCommand(msg);
  if(commandResult) {
    if(typeof commandResult === "object"){
      let msgOptions = {tts: false};
      if(commandResult.tts) msgOptions.tts = commandResult.tts;
      if(commandResult.responseText) msg.reply(commandResult.responseText, msgOptions);
    }
    else msg.reply(commandResult);
  }
}

module.exports = {
  handleMessage: handleMessage
};
