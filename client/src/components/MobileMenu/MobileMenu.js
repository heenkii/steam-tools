import "./MobileMenu.scss";

import closeImage from "../../images/close.png";
import Login from "../Login/Login";
import ChangeTheme from "../ChangeTheme/ChangeTheme";

const MobileMenu = ({ visible, closeMenu, onChangeTheme }) => {
  return (
    <>
      <div className={`mobile__menu ${visible ? "" : "hidden"}`}>
        <div className="tools">
          <ChangeTheme onChangeTheme={onChangeTheme} />
          <div className="close">
            <button onClick={closeMenu}>
              <img src={closeImage} alt="" />
            </button>
          </div>
        </div>

        <Login />
        <div className="tabs">There will soon be new features here</div>
      </div>
    </>
  );
};

export default MobileMenu;
