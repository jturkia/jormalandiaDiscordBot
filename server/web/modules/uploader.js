const req = require("request");

const uploadMP3Url = (request, response) => {
  let filename = request.params.filename;
  let url = request.body.url;
  if(!filename || !url){
    response.status(400);
    response.send("filename or url missing");
    return;
  }
  response.send("Ok");
}

const uploadModule = {
  uploadMP3Url: uploadMP3Url
};

module.exports = uploadModule;
