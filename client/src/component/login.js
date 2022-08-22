
import { useState } from 'react';
import styles from '../asset/css/singup.module.css'
import Cookies from 'universal-cookie';
import { useToasts } from 'react-toast-notifications';

import { useNavigate } from 'react-router-dom';

export const Login=(props)=>{


  const {addToast}= useToasts();
  const history=useNavigate();
  const [user,setUser]= useState({
    email:"",password:""
  });

  let name,value;

  const handleInputs=(e)=>{
     
   
    name=e.target.name;
    value=e.target.value;

    setUser({...user,[name]:value})

  }

  const Postdata= async(e)=>{
          e.preventDefault();
        
          const {email,password}=user;
          const response= await fetch('/log-in',{
            method:"POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
             email,password
            })
          });

        
          const data= await response.json();
        
         
          if(response.status===200){
            addToast("Done",{
              appearances:true,
              autoDismiss:true
            });
            props.login(true);
            history('/explore')
          }
          else{
            addToast("Invalid Information ‼️",{
              appearances:false,
              autoDismiss:true
            });
          }
  }



     return(
    <div className={styles.container}>
        
        <div className={styles.logincontainer}>
          <div className={styles.card_title}>
            <h1>Log in</h1>
          </div>
          <div className={styles.form}>
            <form  method="POST">
              
              <input type="email" name="email" placeholder="User Email" id="email" 
                 value={user.email}
                 onChange={handleInputs}
              />
             
             
              <input type="password" name="password" placeholder="Password" id="password"
                  value={user.password}
                  onChange={handleInputs}
              />
              <button onClick={Postdata}>Log-in</button>
              
            </form>
          </div>
        </div>
      </div>
     )
}


export default Login;