import Cookies from 'universal-cookie';
import '../asset/css/user-profile.css'
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Url } from '../constants/link';
import { BiUser } from "react-icons/bi";
import profileIcon from "../asset/images/profileIcon.jpg";

export const Userprofile = () => {
  const { addToast } = useToasts();
  const history = useNavigate();
  const [user, setuser] = useState();
  const [email, setemail] = useState();
  const [course, setcourse] = useState();
  const [coin, setcoin] = useState();
  const [proffession, setprofession] = useState();

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
    // <div className="user-wrapper">
    //   <div className="wrapper">
    //     <div className="img-area">
    //       <div className="inner-area">
    //       </div>
    //     </div>
    //     <div className="name">{user}</div>
    //     <div className="career">{proffession}</div>
    //     <hr className="horizon" />
    //     {/* <button className="about">Total Post </button> */}
    //     <div className="info">
    //       {/* <p>Name: Namit</p> */}
    //       <p>Branch: {course}</p>
    //       <p />
    //       <p />
    //       <p />
    //       <p>Email: {email}</p>
    //       <p className="gold">Total Coins: {coin}</p>
    //       <p />
    //     </div>
    //     <Link to="/soon"> <p className="flow"> <li className="li-color"> Contribution In Answers</li></p></Link>
    //   </div>
    // </div>
    <>
      <div className="w-[100%] flex flex-col justify-center items-center">
        <div className="flex justify-start items-center gap-2 w-[90%]">
          <BiUser className="text-violet-500" size={24} />
          <p className="font-semibold">Profile</p>
        </div>
        <div className="shadow-xl rounded-md p-10 max-md:p-5  flex flex-col justify-center items-center">
          <div className="flex flex-col justify-start items-center text-center">
            <img src={profileIcon} className="w-[120px] h-[120px] rounded-[50%] bg-cover" />
             <div className="flex flex-col">
              <span className="font-semibold">{user}</span>
              <span className="font-sm font-semibold text-[#808080]">{proffession}</span>
             </div>
          </div>
        <span className="w-[100%] border-[1px] mt-5 border-black"></span>
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
          <button className="w-max bg-[#FFD700] text-black hover:border-black hover:bg-white font-bold border-[1px] rounded-md py-2 px-4 text-[10px] ">
            View Contributions
          </button>
         
        </div>
      </div>
    </>
  )


}


export default Userprofile;