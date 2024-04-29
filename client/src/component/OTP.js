
import { useState } from 'react'
import styles from '../asset/css/singup.module.css'
import { Url } from '../constants/link';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useTheme } from './ThemeContext';

export const Otp = (props) => {

  const history = useNavigate();
  const { addToast } = useToasts();
  const email = props.otpemail;
  const { theme, changeTheme } = useTheme();

  const [sending, setsending] = useState(false);

  const [otp, setotp] = useState('');

  const handleInputs = (e) => {


    setotp(e.target.value);

    console.log(otp)

  }
  const sendotp = async (e) => {
    setsending(true);
    e.preventDefault();

    const useremail = email;
    const myotp = otp;
    const response = await fetch(Url + '/otp', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        useremail, myotp
      })
    });



    setsending(false);
    if (response.status === 200) {



      addToast("Created", {
        appearances: true,
        autoDismiss: true
      });

      history('/login')

    }
    else {

      return addToast("Invalid", {
        appearances: false,
        autoDismiss: true
      });
    }



  }

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"80vh",backgroundImage: "url('https://img.freepik.com/premium-vector/problem-solution-business-solving-look-ideas-with-concept-teamwork-can-use-web-banner-background-flat-illustration_2175-2898.jpg?w=900')"}} >

      <div style={{backgroundColor: theme === "dark" ? "black" : "white", color: theme === "dark" ? "white" : "black",padding:"20px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",border:"1px solid black",borderRadius:"20px", }}>
        <div className={styles.card_title}>
          <h1>Otp Verfication</h1>
        </div>
        <div >
          <form method="POST" style={{display:"flex", alignItems:"center",flexDirection:"column",gap:"20px"}}>

            <input type="text" name="otp" placeholder="OTP Sent at your Email" id="otp"
              value={otp}
style={{width:"300px",border:"solid 1px gray", padding:"10px",borderRadius:"10px"}}
              onChange={handleInputs}
            />

            <button onClick={sendotp} disabled={sending} style={{padding:"5px 20px",backgroundColor:"#FFD700", borderRadius:"10px", color:"black"}}>
              {sending ? 'Sending..' : 'Send'}
            </button>

          </form>
        </div>
      </div>
    </div>

  )
}