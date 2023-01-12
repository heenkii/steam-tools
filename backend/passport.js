const passport = require("passport");
const Strategy = require("passport-steam").Strategy;
const config = require("config");

const serverUrl = config.get("SERVER_URL");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new Strategy(
    {
      returnURL: `${serverUrl}/auth/steam/return`,
      realm: `${serverUrl}/`,
      apiKey: config.get("STEAM_API_KEY"),
    },
    function (identifier, profile, done) {
      process.nextTick(function () {
        profile.identifier = identifier;
        return done(null, profile);
      });
    }
  )
);

module.exports = passport;
