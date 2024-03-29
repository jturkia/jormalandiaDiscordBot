const fs = require("fs");
const https = require("https");
const http = require("http");
const bodyParser = require("body-parser");
const Express = require("express");
const helmet = require("helmet");

module.exports = (client, channelRetriever) => {

  const router = require(__dirname + "/router.js")(client, channelRetriever);

  const app = Express();
  app.use(bodyParser.json({ limit: '5mb', parameterLimit: 10000}));
  app.use(bodyParser.urlencoded({
    parameterLimit: 10000,
    limit: '5mb',
    extended: true
  }));
  app.use(helmet());
  app.use(router);

  /*
  Load certificates
  */
  const serverOpts = {
    key: fs.readFileSync(__dirname + "/certs/key.key"),
    cert: fs.readFileSync(__dirname + "/certs/cert.crt"),
    requestCert: false,
    rejectUnauthorized: false
  };

  const httpsServer = https.createServer(serverOpts, app).listen(443, () => {
    console.log("Server started at port 443");
  });

  // Redirect all http requests to https
  const httpApp = new Express();
  httpApp.all("*", (req, res) => {
    res.redirect('https://' + req.headers.host + req.url);
  });
  const httpServer = http.createServer(httpApp).listen(80, () => {
    console.log("Redirecter start at port 80");
  });
}
