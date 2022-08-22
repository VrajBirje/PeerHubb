import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useEffect, useState } from 'react';

const Logout=(props)=>{

  const {addToast}= useToasts();
  const history=useNavigate();

    const callPost= async()=>{

        console.log("eerrr");
          try{
            const res= await fetch('/logout',{
              method:"GET",
              headers:{
                 Accept:"application/json",
                "Content-Type": "application/json"
              },
              credentials:"include"
             });
    
            
             props.login(false);
             addToast("Log out ‼️",{
              appearances:true,
              autoDismiss:true
            });
             history('/login')
           
             
    
    
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
        <div></div>
    )
}

export default Logout;