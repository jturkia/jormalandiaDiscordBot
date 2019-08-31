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

const handleMessage = (msg) => {
  printMessageInfo(msg);
}

module.exports = {
  handleMessage: handleMessage
};
