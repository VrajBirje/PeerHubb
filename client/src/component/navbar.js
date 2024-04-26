
import '../asset/css/navbar.css';

import { Link } from "react-router-dom";
import profileIcon from "../asset/images/profileIcon.jpg";



export const Navbar = (props) => {


  var token = document.cookie.substring(6);

  // console.log("Value of prop "+props.allCookies.Cookies);
  console.log(props.login);


  let l1;
  let l2;
  if (props.login) {
    l1 = <li ><Link to="/my-profile">Profile</Link></li>
    l2 = <li ><Link to="/log-out">Log-out</Link></li>;
  }
  else {
    l1 = <li ><Link to="/login">Log-in</Link></li>
    l2 = <li ><Link to="/sing-up">Sign-up</Link></li>;
  }

  return (

<>
      <div className="bg-white w-[100%] flex justify-between items-center px-2 md:px-10">
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
                  className="h-[50px] w-[50px] cursor-pointer"
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

      <div className="bg-[#808080] flex gap-2 md:gap-10 px-2 md:px-10 py-2 text-[12px] font-semibold text-white">
        <Link className="hover:text-[#FFD700]" to="/">
          Home
        </Link>
        <Link className="hover:text-[#FFD700]" to="/explore">
          Explore
        </Link>
        <Link className="hover:text-[#FFD700]" to="/library">
          E-Library
        </Link>
        <Link className="hover:text-[#FFD700]" to="/rank">
          Rank
        </Link>
        {props.login && 
          <Link className="hover:text-[#FFD700]" to="/chat">
          Chats
        </Link>
        }
        {props.login && 
          <Link className="hover:text-[#FFD700]" to="/log-out">
          Log out
        </Link>
        }
      </div>
    </>



  )
}

export default Navbar;