const fs = require("fs");

const usage = () => {
  return "!suggest <suggestion>";
}

const execute = (msgObject, params, cb) => {
  let date = new Date();
  let suggestor = msgObject.author.username;
  let timestamp = date.getTime();
  let data = {
    suggestor: suggestor,
    timestamp: timestamp,
    suggestion: params.join(" "),
    handled: false
  };
  fs.writeFile(__dirname + "/../../data/suggestions/" + suggestor + "-" + timestamp, JSON.stringify(data, null, 4), "utf-8", (err) => {
    if(err) {
      console.log("Error storing suggestion: " + err);
      cb("Something went wrong, couldn't store suggestion");
    }
    else{
      cb("Your suggestion has been stored!");
    }
  });
}

const suggestModule = {
  usage: usage,
  execute: execute
};

module.exports = suggestModule;
