import { useSelector } from "react-redux";

import "./GamesList.scss";
import GameCard from "../GameCard/GameCard";

import { motion } from "framer-motion";

const textAnimation = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const GamesList = ({ findData, sortType, sortReverse }) => {
  let games = useSelector((state) => state.games);
  games = games.items;
  games = games.filter((game) => {
    const gameName = game.name.toLowerCase();
    const fData = findData.toLowerCase();

    return gameName.includes(fData);
  });

  games = games.sort((game1, game2) => {
    if (sortType === "statistic") {
      if (game1.allAchievements !== 0 && game2.allAchievements === 0) {
        return -1;
      }
      if (game1.allAchievements === 0 && game2.allAchievements !== 0) {
        return 1;
      }

      if (
        game1.obtainedAchievements / game1.allAchievements ===
        game2.obtainedAchievements / game2.allAchievements
      ) {
        return game1.allAchievements < game2.allAchievements ? 1 : -1;
      } else {
        game1 = game1.obtainedAchievements / game1.allAchievements;
        game2 = game2.obtainedAchievements / game2.allAchievements;
        return game1 < game2 ? 1 : -1;
      }
    } else {
      game1 = game1[sortType];
      game2 = game2[sortType];
    }
    return game1 < game2 ? 1 : -1;
  });

  if (sortReverse) {
    games = games.reverse();
  }

  if (sortType === "name") {
    games = games.reverse();
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={textAnimation}
      className="games__data"
    >
      {games.map((game, key) => (
        <GameCard game={game} key={game.id} />
      ))}
    </motion.div>
  );
};

export default GamesList;
