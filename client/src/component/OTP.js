
import { useState } from 'react'
import styles from '../asset/css/singup.module.css'
import { Url } from '../constants/link';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';


export const Otp=(props)=>{
    
  const history=useNavigate();
  const {addToast}= useToasts();
    const email= props.otpemail;


    const [sending,setsending]= useState(false);

    const [otp,setotp]= useState('');
     
    const handleInputs=(e)=>{
         
        
        setotp(e.target.value);

        console.log(otp)

    }
    const sendotp= async (e)=>{
        setsending(true);
        e.preventDefault();
        
        const useremail=email;
        const myotp= otp;
        const response = await fetch(Url+'/otp',{
          method:"POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            useremail,myotp
          })
        });

        

        setsending(false);
        if(response.status===200){

         
          
          addToast("Created",{
            appearances:true,
            autoDismiss:true
          });
         
          history('/login')
          
        }
        else{
        
          return addToast("Invalid",{
            appearances:false,
            autoDismiss:true
          });
        }
       


    }

    return(
        <div className={styles.container}>
        
        <div className={styles.logincontainer}>
          <div className={styles.card_title}>
            <h1>Otp Verfication</h1>
          </div>
          <div className={styles.form}>
            <form  method="POST">
              
              <input type="text" name="otp" placeholder="OTP Sent at your Email" id="otp" 
                 value={otp}
                 onChange={handleInputs}
              />
             
              <button onClick={sendotp} disabled={sending}>
              {sending? 'Sending..':'Send'}
                </button>
              
            </form>
          </div>
        </div>
      </div>
     
    )
}