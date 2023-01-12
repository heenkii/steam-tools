import "./GameCard.scss";
import { Fragment } from "react";

import gamePlaceHolder from "../../../images/game-logo-placeholder.jpg"; //"../../../../images/game-logo-placeholder.jpg";

const GameCard = ({ game }) => {
  const width = `${(game.obtainedAchievements / game.allAchievements) * 100}%`;

  const color = width === "100%" ? "rgb(153, 62, 37)" : "rgb(82, 158, 121)";

  return (
    <div className="game">
      <a
        href={`https://store.steampowered.com/app/${game.id}/`}
        target="_blank"
        className="game__link"
      >
        <div className="game__logo">
          <img
            src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.id}/header.jpg`}
            alt=""
            className="game__logo__image"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = gamePlaceHolder;
            }}
          />
        </div>
        <div className="game__info">
          <div className="name">
            {game.name.length > 33 ? game.name.slice(0, 30) + "..." : game.name}
          </div>
          <div className="play__time">{game.playtime} hours</div>
          <div className="statistic">
            {game.allAchievements === 0 ? (
              <div className="no__achievements">===========</div>
            ) : (
              <div className="progress__bar">
                <div
                  className="complete__line"
                  style={{ width: width, background: color }}
                ></div>
                <div className="border__line"></div>
                <div className="stat__data">
                  {game.obtainedAchievements}/{game.allAchievements}
                </div>
              </div>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

export default GameCard;
