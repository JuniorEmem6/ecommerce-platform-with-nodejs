const express = require("express");
require("dotenv").config();
const http = require("http");

require("./database/db-connect");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(
  session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 50000,
    },
  })
);

server.use(helmet());
server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//Routes on server
server.use("/customer", require("./routes/customers"));
server.use("/", require("./routes/order"));

server.listen(5000, () => {
  console.log(`listening on port 5000`);
});
