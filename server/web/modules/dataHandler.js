const fs = require("fs");

const suggestionFolder = __dirname + "/../../data/suggestions";

const getSuggestion = (request, response) => {
  let id = request.params.id;
  if(!id){
    response.status(400);
    response.send("Missing id");
  }
  else{
    fs.readFile(suggestionFolder + "/" + id, "utf-8", (err, data) => {
      if(err){
        if(err.code === "ENOENT"){
          response.status(404);
          response.send("Suggestion with id " + id + " not found");
        }
        else{
          response.status(500);
          response.send("Error reading suggestion");
        }
      }
      else{
        response.status(200);
        response.json(JSON.parse(data));
      }
    });
  }
}

const getSuggestions = (request, response) => {
  fs.readdir(suggestionFolder, (err, files) => {
    if(err) {
      response.status(500);
      response.send("Error reading suggestions");
    }
    else{
      response.status(200);
      response.json(files);
    }
  });
}

const updateSuggestion = (request, response) => {
  let id = request.params.id;
  if(!id){
    response.status(404);
    response.send("Suggestion with id: " + id + " not found");
  }
  fs.readFile(suggestionFolder + "/" + id, "utf-8", (err, data) => {
    if(err){
      if(err.code === "ENOENT"){
        response.status(404);
        response.send("Suggestion with id " + id + " not found");
      }
      else{
        response.status(500);
        response.send("Error updating suggestion");
      }
    }
    else{
      let suggestion = JSON.parse(data);
      let body = request.body;
      if(body.handled && typeof body.handled === "boolean") suggestion.handled = body.handled;
      if(body.comments && typeof body.comments === "string") suggestion.comments = body.comments;
      fs.writeFile(suggestionFolder + "/" + id, JSON.stringify(suggestion, null, 4), "utf-8", (err) => {
        if(err) {
          response.status(500);
          response.send("Error updating suggestion");
        }
        else{
          response.status(200);
          response.send("Suggestion " + id + " updated");
        }
      });
    }
  });
}

const deleteSuggestion = (request, response) => {
  let id = request.params.id;
  if(!id){
    response.status(404);
    response.send("Suggestion with id: " + id + " not found");
  }
  else{
    fs.unlink(suggestionFolder + "/" + id, (err) => {
      if(err){
        if(err.code === "ENOENT"){
          response.status(404);
          response.send("Suggestion with id: " + id + " not found");
        }
        else{
          response.status(500);
          response.send("Error while deleting suggestion");
        }
      }
      else{
        response.status(200);
        response.send("Deleted: " + id);
      }
    });
  }

}

const dataHandlerModule = {
  getSuggestion: getSuggestion,
  getSuggestions: getSuggestions,
  updateSuggestion: updateSuggestion,
  deleteSuggestion: deleteSuggestion
};

module.exports = dataHandlerModule;
