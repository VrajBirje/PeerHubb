import Cookies from 'universal-cookie';
import '../asset/css/user-profile.css'
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Url } from '../constants/link';

export const Userprofile=()=>{
  const {addToast}= useToasts();
  const history=useNavigate();
  const [user,setuser]= useState();
  const [email,setemail]= useState();
  const [course,setcourse]= useState();
  const [coin,setcoin]= useState();
  const [proffession,setprofession]= useState();

  const callPost= async()=>{
    const cookies = new Cookies();
    console.log("eerrr");
      try{
        const fromdata= new FormData();
        const c= cookies.get('token');
        console.log(c);
        fromdata.append('cookies',c);
        const res= await fetch(Url+'/verify-user',{
          method:"POST",
           body:fromdata
          
         });

        
         const data= await res.json();
         const a=data.message.username;
          setuser(data.message.username);
          setcourse(data.message.enrolled);
          setcoin(data.message.point);
          setemail(data.message.email);
          setprofession(data.message.profession);
       

        
         if(!res.status===200){
          addToast("Login First ‼️",{
            appearances:false,
            autoDismiss:true
          });
              history('/login')
        
        }
       
         


      }
      catch(err){
        addToast("Login First ‼️",{
          appearances:false,
          autoDismiss:true
        });
            history('/login')
      }
  }

  useEffect(()=>{
    callPost();
   },[])


    return(
        <div className="user-wrapper">
        <div className="wrapper">
        <div className="img-area">
          <div className="inner-area">
         
     
         
         
        


                 
          </div>
        </div>
        <div className="name">{user}</div>
        <div className="career">{proffession}</div>
        <hr className="horizon" />
        {/* <button className="about">Total Post </button> */}
        <div className="info">
          {/* <p>Name: Namit</p> */}
          <p>Branch: {course}</p>
          <p />
          <p />
          <p />
          <p>Email: {email}</p>
          <p className="gold">Total Coins: {coin}</p>
          <p />
        </div>
        <Link to="/soon"> <p className="flow"> <li className="li-color"> Contribution In Answers</li></p></Link>
      </div>
      </div>
    )


}


export default Userprofile;