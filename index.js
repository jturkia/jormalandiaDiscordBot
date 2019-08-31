require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

const messageHandler = require(__dirname + "/server/handlers/messageHandler.js");
const presenceUpdateHandler = require(__dirname + "/server/handlers/presenceUpdateHandler.js");
const voiceStatusHandler = require(__dirname + "/server/handlers/voiceStatusHandler.js");

const channelRetriever = require(__dirname + "/server/retrievers/channelRetriever.js")(client);

client.on("ready", () => {
  console.log("Logged in as " + client.user.tag);
  let channel = channelRetriever.getChannelByName("test");
  if(channel) channel.send("Have no fear, " + client.user.username + " is here!");
});

client.on("message", messageHandler.handleMessage);
client.on("voiceStateUpdate", voiceStatusHandler.handleStatusUpdate);
client.on("presenceUpdate", presenceUpdateHandler.handlePresenceUpdate);

client.login(process.env.bot_token);

const exitHandler = (msg) => {
  client.removeAllListeners();
  console.log("Exiting with " + msg);
  let channel = channelRetriever.getChannelByName("test");
  if(channel && client.status === 0) channel.send(client.user.username + " going away :(")
    .then( msg => client.destroy().then( () => process.exit()).catch( () => process.exit()))
    .catch( msg => client.destroy().then( () => process.exit()).catch( () => process.exit()));
  else client.destroy().then( () => process.exit()).catch( () => process.exit());
}

process.on("exit", exitHandler.bind("exit"));
process.on("SIGINT", exitHandler.bind("SIGINT"));
process.on("SIGUSR1", exitHandler.bind("SIGUSR1"));
process.on("SIGUSR2", exitHandler.bind("SIGUSR2"));
process.on("uncaughtException", exitHandler.bind("uncaughtException"));
