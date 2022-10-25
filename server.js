const path = require("path");
const express = require("express");
const http = require("http");

const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const errorHandler = require("errorhandler");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
// const { server, app, express } = require("./socket");

const port = 8000;

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === "production";

app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "irzko",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/upload", express.static("upload"));

if (!isProduction) {
  app.use(errorHandler());
}

mongoose.connect("mongodb://127.0.0.1/irzko");
mongoose.set("debug", true);

// Add models
require("./src/users/models/users.model");
// require("./models/posts.model");

// Add routes
app.use(require("./src/routers/routes.config"));

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

server.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const { like } = require("./src/newsfeed/models/post.model");

io.on("connection", (socket) => {
  socket.on("like", (data) => {
    like(data.post_id, data.profile_id);
  });

  // socket.emit("get_post", ()
});