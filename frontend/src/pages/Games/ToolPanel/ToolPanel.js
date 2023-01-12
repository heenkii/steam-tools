import "./ToolPanel.scss";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchGames } from "../../../redux/slices/games";

const ToolPanel = ({ updateSearch }) => {
  const [search, setSearch] = useState("");
  const update = (data) => {
    data = data.target.value;
    setSearch((search) => data);
    updateSearch(data);
  };

  const dispatch = useDispatch();

  const updateGames = async () => {
    await dispatch(fetchGames);
  };
  return (
    <div className="games__tool__panel">
      <input
        value={search}
        onChange={update}
        type="text"
        placeholder="search"
        className="input__search__games"
      />
    </div>
  );
};

export default ToolPanel;
