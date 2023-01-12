const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passport = require("./passport");
const config = require("config");
const path = require("path");
const fs = require("fs");

const clientUrl = config.get("CLIENT_URL");

const app = express();
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "build")));

//create cookie configurations
app.use(
  cookieSession({
    name: "session",
    keys: [config.get("COOKIES_KEY")],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(
  cors({
    origin: clientUrl,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//passport init
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
app.use("/auth", require("./routes/auth.routes"));
app.use("/api", require("./routes/data.routes"));

const port = config.get("PORT");

app.listen(port, () => {
  try {
    console.log(clientUrl);
    console.log("Listening, port " + port);
  } catch (error) {
    console.log("error");
    console.log(err);
  }
});
