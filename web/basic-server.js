var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");

// Create archive folder and docs
// (need to do this each time we clone repo because archive is in gitignore)
initialize();

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
