import express from "express";
import http from "http";
import { Server } from "socket.io";

import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import useragent from "express-useragent";
import httpErrors from "http-errors";
import Resp from "./src/scripts/Responser";
import { ValidateSocket } from "./src/middlewares/Authentication";
import SocketService from "./src/controllers/socketController/SocketService";
import Db from "./database"
//import insertMochData from "./src/Scripts/MochData";
/**
 * Module dependencies.
 */
require("dotenv").config();

const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");
Db();
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./public/")));
app.use(useragent.express());

app.use("/", require("./src/routes/index"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(httpErrors(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  return Resp.bind(res)({
    message: "خطایی رخ داده است.",
    devMsg: res.locals.message,
    status: false,
  });
});

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "4000");
app.set("port", port);

/**
 * Create HTTPS server.
 */

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

io.use(ValidateSocket);
io.on("connect", SocketService);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log(`[${process.env.APP_MODE} Api]: The server is online on ${bind}`);
}
