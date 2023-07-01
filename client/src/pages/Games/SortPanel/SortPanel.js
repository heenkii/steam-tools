import "./SortPanel.scss";

const SortPanel = ({ updateSort }) => {
  const onSelectSort = (e) => {
    const classSelected = e.target.className;
    if (classSelected.includes("sort__btn")) {
      const sortCat = classSelected.split(" ")[1];
      console.log(sortCat);
      updateSort(sortCat);
    }
  };
  return (
    <div className="games__sort__panel" onClick={onSelectSort}>
      <div className="btn__div">
        <button className="sort__btn name">Name ⬇️</button>
      </div>
      <div className="btn__div">
        <button className="sort__btn playtime">Time ⬇️</button>
      </div>
      <div className="btn__div">
        <button className="sort__btn statistic">Statistic ⬇️</button>
      </div>
    </div>
  );
};

export default SortPanel;
