const fs = require("fs");
const path = require("path");

const usage = () => {
  return "!voices";
}

const execute = (msgObject, params, cb) => {
  fs.readdir(path.join(__dirname, "..", "voice-clips"), (err, files) => {
    if(err){
      console.log(err);
      cb(null);
    }
    else{
      let txt = "";
      for(let i = 0; i < files.length; i++){
        txt += "- " + files[i].replace(/\.mp3/, "") + "\n";
      }
      cb(txt);
    }
  });
}

const voicesModule = {
  usage: usage,
  execute: execute
};

module.exports = voicesModule;
