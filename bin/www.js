const app = require("../src/app");
const http = require("http");

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

server.on("connection", (stream) => {
  console.log(stream);
});

server.on("request", (stream) => {
  console.log(stream);
});

server.listen(PORT, () => {
  console.log(`listening on port 5000`);
});
