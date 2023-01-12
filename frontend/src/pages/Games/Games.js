import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchGames } from "../../redux/slices/games";

import Spinner from "../../components/Spinner/Spinner";
import GamesList from "./GamesList/GamesList";
import ToolPanel from "./ToolPanel/ToolPanel";
import SortPanel from "./SortPanel/SortPanel";

import { motion } from "framer-motion";

const Games = () => {
  const [sortType, setSortType] = useState("name");
  const [sortReverse, setSortReverse] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  const games = useSelector((state) => state.games);

  const isLoadedGames = games.status === "loaded";

  const updateGamesList = () => {
    try {
      if (user.status) {
        const userId = user.data.id;
        dispatch(fetchGames(userId));
      }
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    updateGamesList();
  }, []);

  const updateSort = (sortData) => {
    if (sortData === sortType) {
      setSortReverse((sortReverse) => !sortReverse);
    } else {
      setSortType((sortType) => sortData);
      setSortReverse((sortReverse) => false);
    }
  };

  const updateSearch = (searchData) => {
    setSearch((search) => searchData);
  };

  if (!isLoadedGames) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <div className="games__page">
      <ToolPanel updateSearch={updateSearch} />
      <SortPanel updateSort={updateSort} />
      <GamesList
        findData={search}
        sortType={sortType}
        sortReverse={sortReverse}
      />
    </div>
  );
};

export default Games;
