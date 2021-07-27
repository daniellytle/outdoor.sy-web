const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const debug = require("debug")("express-demo:server");
const http = require("http");

const app = express();

// view engine setup
app.set("views", "views");
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("source/public"));

// Register view routes
const routes = require("./routes/views");
app.use("/", routes);

// Register API routes
const api = require("./routes/api");
app.use("/", api);

const port = "8080";
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("listening", onListening);

/**
* Event listener for HTTP server "listening" event.
*/
function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
    debug("Listening on " + bind);
}
