require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const passport = require("passport");

require("./passport");

const mongoConnectURI = "mongodb://localhost/ideabox-api";
// process.env.ENV === "development"
//   ? "mongodb://localhost/ideabox-api"
//   : process.env.MONGODB_URI;

mongoose
  .connect(mongoConnectURI, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

hbs.registerHelper("ifUndefined", (value, options) => {
  if (arguments.length < 2)
    throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

// Enable authentication using session + passport
app.use(
  session({
    secret: "irongenerator",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(flash());
require("./passport")(app);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const ideaRoutes = require("./routes/ideas");
app.use("/api", ideaRoutes);

const commentRoutes = require("./routes/comments");
app.use("/api", commentRoutes);

const ideaSubmissionRoute = require("./routes/ideaSubmission");
app.use("/api", ideaSubmissionRoute);

const getUsers = require("./routes/users");
app.use("/api", getUsers);

const draftsRoute = require("./routes/drafts");
app.use("/api", draftsRoute);

const adminRoutes = require("./routes/admin");
app.use("/api", adminRoutes);

const timeRoute = require("./routes/timeKeeper");
app.use("/api", timeRoute);

const challengeRoutes = require("./routes/challenges");
app.use("/api", challengeRoutes);

const userProfileRoute = require("./routes/userProfile");
app.use("/api", userProfileRoute);

app.use((req, res, next) => {
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;
