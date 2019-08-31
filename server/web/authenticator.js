const fs = require("fs");
const bcrypt = require("bcryptjs");

const deny = (response) => {
  response.status(401);
  response.set("WWW-Authenticate", "Basic realm=\"Admin\"")
  response.send();
}

const authenticate = (request, response, next) => {
  let authHeader = request.headers.authorization;
  if(!authHeader) deny(response);
  else{
    let splitted = authHeader.split(" ");
    if(splitted.length != 2) deny(response);
    else if(splitted[0] !== "Basic") deny(response);
    else{
      fs.readFile(__dirname + "/users/users.json", "utf-8", (err, data) => {
        if(err) {
          console.log("ERROR reading users.json " + err);
          response.status(500);
          response.send();
        }
        else{
          let users = JSON.parse(data);
          let buffer = new Buffer(splitted[1], "base64");
          let authString = buffer.toString("utf-8");
          let authSplit = authString.split(":");
          if(authSplit.length < 2) deny(response);
          else{
            let username = authSplit[0];
            let password = "";
            for(let i = 1; i < authSplit.length; i++){
              password += authSplit[i];
              if(i < authSplit.length - 1) password += ":";
            }
            if(!users[username]) deny(response);
            else{
              let userPassword = users[username];
              bcrypt.compare(password, userPassword, (err, res) => {
                if(err){
                  console.log("Comparison failed?!?!?");
                  deny(response);
                }
                else if(res) next();
                else deny(response);
              });
            }
          }
        }
      });
    }
  }
}

const authModule = {
  authenticate: authenticate
}

module.exports = authModule;
