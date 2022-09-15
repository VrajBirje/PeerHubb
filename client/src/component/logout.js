import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useCookies } from 'react-cookie';
import { Url } from '../constants/link';

const Logout=(props)=>{
  const [cookies, setCookie] = useCookies('');
  const {addToast}= useToasts();
  const history=useNavigate();

    const callPost= async()=>{

       
          try{
            const cookies = new Cookies();
            const fromdata= new FormData();
            const c= cookies.get('token');
            
            fromdata.append('cookies',c);
            const res= await fetch(Url+'/logout',{
              method:"POST",
              body:fromdata
             });
    
            
             props.login(false);
             setCookie("token",undefined);
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