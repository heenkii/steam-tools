import Header from "../Header/Header";
import Games from "../../pages/Games/Games";

import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "../../redux/slices/auth";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.scss";
import MobileMenu from "../MobileMenu/MobileMenu";
import DataPlaceholder from "../DataPlaceholder/DataPlaceholder";

function App() {
  const [theme, setTheme] = useState("");
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const isAuth = user.data !== null;

  useEffect(() => {
    if (!window.localStorage.getItem("theme")) {
      window.localStorage.setItem("theme", "dark__theme");
    }
    setTheme((theme) => window.localStorage.getItem("theme"));
    dispatch(fetchMe());
  }, []);

  const onChangeTheme = (e) => {
    if (e.target.className === "light") {
      window.localStorage.setItem("theme", "dark__theme");
      setTheme((theme) => "dark__theme");
    }
    if (e.target.className === "dark") {
      window.localStorage.setItem("theme", "light__theme");
      setTheme((theme) => "light__theme");
    }
  };

  const openMenu = () => {
    setMobileMenuVisible((mobileMenuVisible) => true);
  };

  const closeMobileMenu = () => {
    setMobileMenuVisible((mobileMenuVisible) => false);
  };

  return (
    <>
      <div
        className={`content ${theme} ${
          mobileMenuVisible ? "stop__scroll" : ""
        }`}
      >
        <Header onChangeTheme={onChangeTheme} showMenu={openMenu} />

        <main className="main row">
          <div className="container">
            {isAuth ? <Games /> : <DataPlaceholder />}
          </div>
        </main>

        <footer className="footer row">
          <div className="container">
            <div className="creator">
              Copyright © 2022 code_tamer. All rights reserved.
            </div>
          </div>
        </footer>
        <MobileMenu
          onChangeTheme={onChangeTheme}
          visible={mobileMenuVisible}
          closeMenu={closeMobileMenu}
        />
      </div>
    </>
  );
}

export default App;
