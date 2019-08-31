require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

const channelRetriever = require(__dirname + "/server/retrievers/channelRetriever.js")(client);
const messageRetriever = require(__dirname + "/server/retrievers/messageRetriever.js")(client);

const messageHandler = require(__dirname + "/server/handlers/messageHandler.js");
const presenceUpdateHandler = require(__dirname + "/server/handlers/presenceUpdateHandler.js");
const voiceStatusHandler = require(__dirname + "/server/handlers/voiceStatusHandler.js");

client.on("ready", () => {
  console.log("Logged in as " + client.user.tag);
});

client.on("message", (message) => {
  if(message.author.username === client.user.username) return;
  messageHandler.handleMessage(message);
});
client.on("voiceStateUpdate", voiceStatusHandler.handleStatusUpdate);
client.on("presenceUpdate", presenceUpdateHandler.handlePresenceUpdate);

client.login(process.env.bot_token);

const exitHandler = (msg) => {
  client.removeAllListeners();
  console.log("Exiting with " + msg);
  client.destroy().then( () => process.exit()).catch( () => process.exit());
}

process.on("exit", exitHandler.bind("exit"));
process.on("SIGINT", exitHandler.bind("SIGINT"));
process.on("SIGUSR1", exitHandler.bind("SIGUSR1"));
process.on("SIGUSR2", exitHandler.bind("SIGUSR2"));
process.on("uncaughtException", exitHandler.bind("uncaughtException"));

require(__dirname + "/server/web");
