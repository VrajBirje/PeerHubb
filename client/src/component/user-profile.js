import Cookies from 'universal-cookie';
import '../asset/css/user-profile.css'
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Url } from '../constants/link';
import { BiUser } from "react-icons/bi";
import profileIcon from "../asset/images/profileIcon.jpg";
import { useTheme } from './ThemeContext';
import { FaRegPenToSquare } from "react-icons/fa6";
import { TbUserSquareRounded } from "react-icons/tb";
import { LuArrowUpCircle, LuArrowDownCircle } from "react-icons/lu";

export const Userprofile = () => {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const { theme, changeTheme } = useTheme();
  const history = useNavigate();
  const [user, setuser] = useState();
  const [email, setemail] = useState();
  const [course, setcourse] = useState();
  const [coin, setcoin] = useState();
  const [proffession, setprofession] = useState();
  const [solved, setsolved] = useState([]);

  const callPost = async () => {
    const cookies = new Cookies();
    console.log("eerrr");
    try {
      const fromdata = new FormData();
      const c = cookies.get('token');

      fromdata.append('cookies', c);
      const res = await fetch(Url + '/verify-user', {
        method: "POST",
        body: fromdata

      });


      const data = await res.json();
      const a = data.message.username;
      setuser(data.message.username);
      setcourse(data.message.enrolled);
      setcoin(data.message.point);
      setemail(data.message.email);
      setprofession(data.message.profession);
      setsolved(data.message.solved)

      console.log(data.message)

      if (!res.status === 200) {
        addToast("Login First ‼️", {
          appearances: false,
          autoDismiss: true
        });
        history('/login')

      }




    }
    catch (err) {
      addToast("Login First ‼️", {
        appearances: false,
        autoDismiss: true
      });
      history('/login')
    }
  }

  useEffect(() => {
    callPost();
  }, [])


  return (
    <>
      <div className={`${theme === 'dark' ? ' bg-[#121212] w-[100%] flex flex-col h-[100%] justify-center items-center' : ' bg-white'} chatcontainer w-[100%] h-[70.8vh] flex flex-col justify-center items-center`}>
        <div className="flex justify-start items-center gap-2 w-[90%]">
          <BiUser className="text-violet-500" size={24} />
          <p style={{ color: theme === 'dark' ? "white" : "black" }} className="font-semibold">Profile</p>
        </div>
        <div style={{ border: theme == 'dark' ? "solid 1px white" : "", color: theme == 'dark' ? "white" : "black" }} className="shadow-xl rounded-md p-10 max-md:p-5  flex flex-col justify-center items-center" >
          <div className="flex flex-col justify-start items-center text-center">
            <img src={profileIcon} className="w-[120px] h-[120px] rounded-[50%] bg-cover" />
            <div className="flex flex-col">
              <span className="font-semibold">{user}</span>
              <span className="font-sm font-semibold text-[#808080]">{proffession}</span>
            </div>
          </div>
          <hr style={{ color: theme === 'solid 1px white' ? "white" : "solid 1px black" }} className="w-[100%] border-[1px] mt-5"></hr>
          <div className="flex gap-4">
            <div>
              <p className="font-semibold">Branch :</p>
              <p className="font-semibold">Email :</p>
              <p className="font-semibold">Total Coins :</p>
            </div>
            <div>
              <p className="">{course}</p>
              <p className="">{email}</p>
              <p className="">{coin} </p>
            </div>
          </div>

        </div>
      </div>
      <div className="w-[100%] flex justify-center pt-10 max-md:px-4">
        <div className="flex flex-col md:w-[90%] pb-5">
          <div className="bg-[#f0e399] p-5 flex justify-between">
            <span className="font-semibold">Your Contribution</span>
            <span className="font-semibold">Total Answers: {solved.length}</span>
          </div>

          {solved.map(item => (
            <div className="shadow-lg rounded-md w-[100%] p-5 md:p-10 mt-2">
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <TbUserSquareRounded size={44} className="text-[#808080]" />
                  <div className="flex flex-col ">
                    <span className="text-[15px] font-semibold">{user}</span>
                    <span className="text-[10px] text-[#808080]">
                      <span className="text-black  font-semibold">
                        Answered on:
                      </span>{" "}
                      12/04/2024{" "}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                 
                </div>
              </div>
              <hr />

              <div>
                <p className="text-[14px]">
                 {item.answer}
                </p>
              </div>
              <div className="flex justify-end items-center">
                <button className=" text-black  hover:bg-[#FFD700] border-[1px] border-black rounded-md py-1 px-4 text-[14px]">
                  Attachment.pdf
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )


}


export default Userprofile;