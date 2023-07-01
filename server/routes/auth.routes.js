const { Router } = require("express");
const passport = require("../passport");
const dotenv = require("dotenv");
//const checkAuth = require("../utils/checkAuth");

dotenv.config();

const router = Router();

router.get("/steam", passport.authenticate("steam"));

router.get(
  "/steam/return",
  passport.authenticate("steam", { failureRedirect: process.env.CLIENT_URL }),
  function(req, res) {
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get("/me", async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({
        error: false,
        message: "Successful Login",
        user: req.user,
      });
    } else {
      res.status(403).json({ success: false, message: "Not Authorized" });
    }
  } catch {
    res.status(403).json({ success: false, message: "Not Authorized" });
  }
});

router.get("/logout", async (req, res) => {
  req.logout();
  res.status(302).redirect(`${process.env.CLIENT_URL}/`);
});

module.exports = router;
