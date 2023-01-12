import ChangeTheme from "../ChangeTheme/ChangeTheme";
import Login from "../Login/Login";

import { motion } from "framer-motion";

import menuImage from "../../images/menu.png";

import "./Header.scss";

const textAnimation = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const Header = ({ onChangeTheme, showMenu }) => {
  return (
    <>
      <header className="header row">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            className="header__data"
          >
            <motion.div variants={textAnimation} className="logo">
              Steam Tools
            </motion.div>
            <div className="header__tools">
              <ChangeTheme onChangeTheme={onChangeTheme} />
              <Login />
            </div>
            <div className="menu">
              <img src={menuImage} alt="" onClick={showMenu} />
            </div>
          </motion.div>
        </div>
      </header>
    </>
  );
};

export default Header;
