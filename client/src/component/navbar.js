import "../asset/css/navbar.css";

import { Link } from "react-router-dom";
import profileIcon from "../asset/images/profileIcon.jpg";

import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { useTheme } from "./ThemeContext";
export const Navbar = (props) => {
  const { theme, changeTheme } = useTheme();

  var token = document.cookie.substring(6);

  // console.log("Value of prop "+props.allCookies.Cookies);
  console.log(props.login);

  let l1;
  let l2;
  if (props.login) {
    l1 = (
      <li>
        <Link to="/my-profile">Profile</Link>
      </li>
    );
    l2 = (
      <li>
        <Link to="/log-out">Log-out</Link>
      </li>
    );
  } else {
    l1 = (
      <li>
        <Link to="/login">Log-in</Link>
      </li>
    );
    l2 = (
      <li>
        <Link to="/sing-up">Sign-up</Link>
      </li>
    );
  }

  return (
    <>
      <div className={`${theme === 'dark' ? ' bg-[#2d2b2b]':'bg-white'}  w-[100%] flex justify-between items-center px-2 md:px-10`}>
        <div className="flex items-center ">
          <Link to="/">
            <span className="text-[35px] text-[#FFD700] font-bold cursor-pointer">
              Peer
            </span>
            <span className="text-[35px] text-black cursor-pointer">Hub</span>
          </Link>
        </div>
        <div>
          <div className="flex gap-x-2 items-center justify-center">
            <span className="text-[25px]">|</span>
            {props.login ? (
              <Link to="/my-profile">
                {" "}
                <img
                  src={profileIcon}
                  className="h-[50px] w-[50px] rounded-[50%] cursor-pointer"
                />{" "}
              </Link>
            ) : (
              <Link to="/login">
                <span className="text-[15px] capitalize cursor-pointer">
                  LOGIN
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className={`${theme === 'dark' ? ' bg-[#262525]  text-white':'bg-[#808080]   text-black'} flex justify-between items-center gap-2 md:gap-10 px-2 md:px-10 py-2 text-[12px] font-semibold text-white`}>
        <div className="flex gap-4 ">
          <Link className={`hover:text-[#FFD700] text-white`} to="/">
            Home
          </Link>
          <Link className="hover:text-[#FFD700] text-white" to="/explore">
            Explore
          </Link>
          <Link className="hover:text-[#FFD700] text-white" to="/library">
            E-Library
          </Link>
          <Link className="hover:text-[#FFD700] text-white" to="/rank">
            Rank
          </Link>
          {props.login && (
            <Link className="hover:text-[#FFD700] text-white" to="/chat">
              Chats
            </Link>
          )}
          {props.login && (
            <Link className="hover:text-[#FFD700] text-white" to="/log-out">
              Log out
            </Link>
          )}
        </div>
        <div className="w-max cursor-pointer flex justify-end">
          {theme === "dark" ? (
            <MdLightMode size={32} onClick={() => changeTheme("white")} />
          ) : (
            <MdDarkMode size={32} onClick={() => changeTheme("dark")} className="text-black" />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
