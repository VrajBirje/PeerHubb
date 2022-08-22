
import { useState } from 'react';
import styles from '../asset/css/singup.module.css'
import { useToasts } from 'react-toast-notifications';

import { useNavigate } from 'react-router-dom';

export const Singup=()=>{
   
  const [user,setUser]= useState({
    username:"",email:"",profession:"",university:"",enrolled:"",courseyr:"",password:""
  });
  const history=useNavigate();
  let name,value;

  const handleInputs=(e)=>{
     
  
    name=e.target.name;
    value=e.target.value;

    setUser({...user,[name]:value})

  }
  const {addToast}= useToasts();
  const Postdata= async(e)=>{
          e.preventDefault();
          
          const {username,email,profession,university,enrolled,courseyr,password}=user;
          const response= await fetch('/register',{
            method:"POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
             username,email,profession,university,enrolled,courseyr,password
            })
          });

          
          const data= await response.json();
           
         
          if(response.status===200){

            addToast("Created",{
              appearances:true,
              autoDismiss:true
            });
            history('/login')
            
          }
          else{
            return addToast("Invalid Information",{
              appearances:false,
              autoDismiss:true
            });
          }
  }



     return(
    <div className={styles.container}>
        
        <div className={styles.card}>
          <div className={styles.card_title}>
            <h1>Create Account</h1>
          </div>
          <div className={styles.form}>
            <form  method="POST">
              <input type="text" name="username" id="username" placeholder="Name" 
                 value={user.username}
                 onChange={handleInputs}
              />
              <input type="email" name="email" placeholder="University Email" id="email" 
                 value={user.email}
                 onChange={handleInputs}
              />
               {/* <input type="email" name="email" placeholder="OTP" id="email" 
                //  value={user.email}
                //  onChange={handleInputs}
              /> */}
              <input type="text" name="profession" id="username" placeholder="Student or Teacher" 
                  value={user.profession}
                  onChange={handleInputs}
              />
              <input type="text" name="university" id="username" placeholder="Univeristy Name" 
                  value={user.university}
                  onChange={handleInputs}
              />
              <input type="text" name="enrolled" id="username" placeholder="Enrolled Course" 
                   value={user.enrolled}
                   onChange={handleInputs}
              />
              <input type="text" name="courseyr" id="username" placeholder="Admission Year" 
                   value={user.courseyr}
                   onChange={handleInputs}
              
              />
              <input type="password" name="password" placeholder="Password" id="password" 
                  value={user.password}
                  onChange={handleInputs}
              />
              <button onClick={Postdata}>Sign Up</button>
              {/* <div className={styles.card_terms}>
                <input type="checkbox" name id="terms" /> <span>I have read and agree to the <a href>Terms of Service</a></span>
              </div> */}
            </form>
          </div>
        </div>
      </div>
     )
}


export default Singup;