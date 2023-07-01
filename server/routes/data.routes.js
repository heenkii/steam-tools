const { Router } = require("express");

const router = Router();

const { getUserGames, getItems } = require("../services/steamService");

router.get("/games", async (req, res) => {
  try {
    const steamId64 = await req.query.steamId64;
    if (steamId64 !== undefined && steamId64 !== "") {
      const data = await getUserGames(steamId64);
      res.json(data);
    } else {
      return res.json({
        message: "Access denied",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Access denied",
    });
  }
});

module.exports = router;
