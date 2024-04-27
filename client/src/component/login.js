import { useState } from "react";
import styles from "../asset/css/singup.module.css";
import Cookies from "universal-cookie";
import { useToasts } from "react-toast-notifications";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Url } from "../constants/link";
import { useTheme } from './ThemeContext';
export const Login = (props) => {
  const [cookies, setCookie] = useCookies("");
  const [loggingIn, setLoggingIn] = useState(false);
  const { addToast } = useToasts();
  const history = useNavigate();
  const { theme, changeTheme } = useTheme();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const Postdata = async (e) => {
    setLoggingIn(true);
    e.preventDefault();

    const { email, password } = user;
    const response = await fetch(Url + "/log-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });
    // console.log(response);

    const data = await response.json();
    console.log(data)
    setCookie("token", data.cookie);

    if (response.status === 200) {
      addToast("Done", {
        appearances: true,
        autoDismiss: true,
      });
      props.login(true);
      setLoggingIn(false);
      history("/explore");
    } else {
      setLoggingIn(false);
      addToast("Invalid Information ‼️", {
        appearances: false,
        autoDismiss: true,
      });
    }
  };

  return (
    // <div className={styles.container}>
    //   <div className={styles.logincontainer}>
    //     <div className={styles.card_title}>
    //       <h1>Log in</h1>
    //     </div>
    //     <div className={styles.form}>
    //       <form method="POST">
    //         <input
    //           type="email"
    //           name="email"
    //           placeholder="User Email"
    //           id="email"
    //           value={user.email}
    //           onChange={handleInputs}
    //         />
    //         <input
    //           type="password"
    //           name="password"
    //           placeholder="Password"
    //           id="password"
    //           value={user.password}
    //           onChange={handleInputs}
    //         />
    //         <button onClick={Postdata} disabled={loggingIn}>
    //           {loggingIn ? "Loging in.." : "Log-in"}
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className={`${theme === 'dark' ? ' bg-[#121212] text-white':' bg-white'} w-[100%]  h-[90vh] flex justify-center items-center`} style={{backgroundImage: "url('https://img.freepik.com/premium-vector/problem-solution-business-solving-look-ideas-with-concept-teamwork-can-use-web-banner-background-flat-illustration_2175-2898.jpg?w=900')"}} >
      <div className="">
        <div className={`${theme === 'dark' ? ' bg-[#262525]':'bg-white'} flex flex-col p-10 shadow-xl rounded-[30px]`}>
          <p style={{fontWeight:"400"}} className="font-semibold text-[20px]">SIGN IN</p>
          <form method="POST" className="flex flex-col gap-5 justify-center items-center">
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              value={user.email}
              onChange={handleInputs}
              className={`${theme === 'dark' ? ' bg-[#413f3f] text-white':'bg-white'} border border-[#C1BBEB] rounded-md w-[100%] p-2`}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              value={user.password}
              onChange={handleInputs}
              className={`${theme === 'dark' ? ' bg-[#413f3f] text-white':'bg-white'} border border-[#C1BBEB] rounded-md w-[100%] p-2`}
            />
            <button onClick={Postdata} disabled={loggingIn} className="px-4 py-2 bg-[#FFD700] w-max rounded-md font-semibold">
              {loggingIn ? "Loging in.." : "Login"}
            </button>
          </form>
          <div className="flex gap-2">
            <p>Don't Have an account ? </p>
            <p className="underline cursor-pointer"><Link to="/sing-up">Create Account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
