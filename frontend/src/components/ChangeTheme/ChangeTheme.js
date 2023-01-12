//import { useState } from "react";

import "./ChangeTheme.scss";

import light from "../../images/sun.png";
import dark from "../../images/moon.png";

const ChangeTheme = ({ onChangeTheme }) => {
  return (
    <div className="change__theme">
      <img src={light} alt="light" className="light" onClick={onChangeTheme} />
      <img src={dark} alt="dark" className="dark" onClick={onChangeTheme} />
    </div>
  );
};

export default ChangeTheme;
