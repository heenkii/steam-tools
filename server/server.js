const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passport = require("./passport");
const dotenv = require("dotenv");

dotenv.config();

const clientUrl = process.env.CLIENT_URL;

const app = express();
app.use(express.json());

//create cookie configurations
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIES_KEY],
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

app.use("/auth", require("./routes/auth.routes"));
app.use("/api", require("./routes/data.routes"));

app.listen(process.env.PORT, () => {
  try {
    console.log("Listening, port " + port);
  } catch (error) {
    console.error(err);
  }
});
