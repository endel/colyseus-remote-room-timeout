const http = require("http");
const fs = require("fs");
const colyseus = require("colyseus");

const httpServer = http.createServer((req, res) => {
  if (req.url === "/static/colyseus.js") {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(fs.readFileSync("static/colyseus.js"));

  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync("index.html"));
  }
});

const gameServer = new colyseus.Server({
  server: httpServer,
  presence: new colyseus.RedisPresence()
});

gameServer.register("dummy_room", require('./DummyRoom.js'));
gameServer.listen(2657);
console.log("Listening on localhost:2657");
