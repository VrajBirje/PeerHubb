import { useState } from "react";
import styles from "../asset/css/singup.module.css";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Url } from "../constants/link";
import { useTheme } from './ThemeContext';
export const Singup = (props) => {
  const [buttonIn, setbuttonIn] = useState(false);
  const { theme, changeTheme } = useTheme();
  const [user, setUser] = useState({
    username: "",
    email: "",
    profession: "",
    university: "",
    enrolled: "",
    password: "",
  });

  const history = useNavigate();
  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const { addToast } = useToasts();
  const Postdata = async (e) => {
    setbuttonIn(true);
    e.preventDefault();

    const { username, email, profession, university, enrolled, password } =
      user;
    const response = await fetch(Url + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        profession,
        university,
        enrolled,
        password,
      }),
    });



    const data = await response.json();

    if (response.status === 200) {
      props.setOtpEmail(data.email);

      addToast("Please Verify", {
        appearances: true,
        autoDismiss: true,
      });
      setbuttonIn(false);
      history("/otp");
    } else {
      setbuttonIn(false);
      return addToast("Invalid Information", {
        appearances: false,
        autoDismiss: true,
      });
    }
  };

  return (
    // <div className={styles.container}>
    //   <div className={styles.card}>
    //     <div className={styles.card_title}>
    //       <h1>Create Account</h1>
    //     </div>
    //     <div className={styles.form}>
    //       <form>
    //         <input
    //           type="text"
    //           name="username"
    //           id="username"
    //           placeholder="UserName (Unique)"
    //           value={user.username}
    //           onChange={handleInputs}
    //         />
    //         <input
    //           type="email"
    //           name="email"
    //           placeholder="University Email (Only)"
    //           id="email"
    //           value={user.email}
    //           onChange={handleInputs}
    //         />

    //         <input
    //           type="text"
    //           name="profession"
    //           id="username"
    //           placeholder="Student or Teacher"
    //           value={user.profession}
    //           onChange={handleInputs}
    //         />
    //         <input
    //           type="text"
    //           name="university"
    //           id="username"
    //           placeholder="Univeristy Name"
    //           value={user.university}
    //           onChange={handleInputs}
    //         />
    //         <input
    //           type="text"
    //           name="enrolled"
    //           id="username"
    //           placeholder="Department"
    //           value={user.enrolled}
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
    //         <div className={styles.card_terms}>
    //           <span>
    //             Publish a Post Related to Education Content Only (I Agreed)
    //           </span>
    //         </div>
    //         <button onClick={Postdata} disabled={buttonIn}>
    //           {buttonIn ? "Please Wait.." : "Sing-up"}
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className={`${theme === 'dark' ? ' bg-[#121212] text-white':' bg-white'} w-[100%]  h-[90vh] flex justify-center items-center`} style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/problem-solution-business-solving-look-ideas-with-concept-teamwork-can-use-web-banner-background-flat-illustration_2175-2898.jpg?w=900')", backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
      <div>
        <div className={`${theme === 'dark' ? ' bg-[#262525]':'bg-white'}  flex flex-col p-10 shadow-xl rounded-[30px]`}>
          <p style={{ fontWeight: "400" }} className="font-semibold text-[20px]">CREATE AN ACCOUNT</p>
          <form
            method="POST"
            className="flex flex-col gap-5 justify-center items-center w-[100%]"
          >
            <div className="flex  gap-5">
              {" "}
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Unique Username"
                value={user.username}
                onChange={handleInputs}
                className={`${theme === 'dark' ? ' bg-[#413f3f] text-white':'bg-white'} border border-[#C1BBEB] rounded-md w-[100%] p-2`}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                value={user.email}
                onChange={handleInputs}
                className={`${theme === 'dark' ? ' bg-[#413f3f] text-white':'bg-white'} border border-[#C1BBEB] rounded-md w-[100%] p-2`}
              />
            </div>
            <div className="flex gap-5">
              <input
                type="text"
                name="profession"
                id="username"
                placeholder="Student or Teacher"
                value={user.profession}
                onChange={handleInputs}
                className={`${theme === 'dark' ? ' bg-[#413f3f] text-white':'bg-white'} border border-[#C1BBEB] rounded-md w-[100%] p-2`}
              />
              <input
                type="text"
                name="university"
                id="username"
                placeholder="Univeristy Name"
                value={user.university}
                onChange={handleInputs}
                className={`${theme === 'dark' ? ' bg-[#413f3f] text-white':'bg-white'} border border-[#C1BBEB] rounded-md w-[100%] p-2`}
              />
            </div>
            <div className="flex gap-5">
              <input
                type="text"
                name="enrolled"
                id="username"
                placeholder="Department"
                value={user.enrolled}
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
            </div>

            <button
              onClick={Postdata}
              disabled={buttonIn}
              className="px-4 py-2 bg-[#FFD700] w-max rounded-md font-semibold"
            >
              {buttonIn ? "Please Wait.." : "Register"}
            </button>
          </form>
          <div className="flex gap-2 justify-center">
            <p>Already have an account ? </p>
            <p className="underline cursor-pointer"><Link to="/login">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singup;
