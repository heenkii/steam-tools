import { useSelector } from "react-redux";
import logoutImage from "../../images/logout.png";
import steamImage from "../../images/steam.png";
import "./Login.scss";

const Login = () => {
  const { data } = useSelector((state) => state.auth);

  const login = () => {
    console.log(process.env.REACT_APP_WEBSITE_NAME);
    window.open(`${process.env.REACT_APP_WEBSITE_NAME}/auth/steam`, "_self");
  };
  const logout = () => {
    window.open(`${process.env.REACT_APP_WEBSITE_NAME}/auth/logout`, "_self");
  };
  return (
    <div className="login">
      {data === null ? (
        <div className="anonymous__user">
          <button className="button" onClick={login}>
            <img src={steamImage} alt="steam" />
            Login
          </button>
        </div>
      ) : (
        <div className="logged__user">
          <a
            href={data._json.profileurl}
            target="_blank"
            className="user__link"
            rel="noreferrer"
          >
            <img
              src={data.photos[1].value}
              alt="avatar"
              className="user__avatar"
            />

            <div className="user__nickname">{data.displayName}</div>
          </a>
          <div className="logout" onClick={logout}>
            <img src={logoutImage} alt="" className="logout__image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
