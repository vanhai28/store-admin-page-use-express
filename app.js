require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("express-handlebars");
const hbshelpers = require("handlebars-helpers");
const multihelpers = hbshelpers();
var session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const adminRouter = require("./routes/admin");
//const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const defaultAcc = require("./model/accModel");

const mongoose = require("./config/db");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const pt = path.resolve(__dirname, "public", "view");
// run mongoose
mongoose.mongoose();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    helpers: multihelpers,
    defaultView: "default",
    layoutsDir: path.join(__dirname, "/views/layout/"),
    partialsDir: __dirname + "/views/partials/",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

//require("./routes/login")(app);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("trust proxy", 1);
app.use(
  session({
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoDBStore({
      uri: process.env.URI,
      collection: "session",
      ttl: parseInt(process.env.SESS_LIFETIME),
    }),
    unset: "destroy",
    cookie: {
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: parseInt(process.env.SESS_LIFETIME),
    },
  })
);

app.use("/", loginRouter);
app.use("/admin", adminRouter);
//app.use("/users", usersRouter);

defaultAcc.createDefaultAcc();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
