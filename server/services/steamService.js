const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const _baseUrl = "https://api.steampowered.com/";
const _key = process.env.STEAM_API_KEY;

const getUserGames = async (steamId64) => {
  try {
    const games = await getGamesData(steamId64);
    let data = { state: "succcess", gamesData: [] };
    const answers = await games.map((game) =>
      getGameAchievements(game.id, steamId64).then((val) => {
        data.gamesData.push({
          ...game,
          ...val,
        });
      })
    );
    await Promise.all(answers);
    return data;
  } catch (err) {
    return { status: "error" };
  }
};

const getGamesData = async (steamId64) => {
  try {
    const url = `${_baseUrl}IPlayerService/GetOwnedGames/v0001/?key=${_key}&steamid=${steamId64}&include_appinfo=true&include_played_free_games=true`;
    const res = await axios.get(url);
    const data = await res.data.response.games;
    const games = await data.map((game) => {
      const playtime = Math.floor((game.playtime_forever / 60) * 10) / 10;
      return {
        id: game.appid,
        name: game.name,
        playtime: playtime,
      };
    });
    return games;
  } catch (err) {
    return [];
  }
};

const getGameAchievements = async (gameId, steamId64) => {
  try {
    const url = `${_baseUrl}ISteamUserStats/GetPlayerAchievements/v0001/?appid=${gameId}&key=${_key}&steamid=${steamId64}&include_appinfo=true`;
    const res = await axios.get(url);
    const data = res.data.playerstats.achievements;

    let userAchievements = {
      obtainedAchievements: 0,
      allAchievements: data.length,
    };
    await data.forEach((game) => {
      userAchievements.obtainedAchievements += game.achieved;
    });
    return userAchievements;
  } catch (err) {
    return {
      obtainedAchievements: 0,
      allAchievements: 0,
    };
  }
};

module.exports.getUserGames = getUserGames;
