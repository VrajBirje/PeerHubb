import '../asset/css/solves.css'

import { useToasts } from 'react-toast-notifications';

import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Url } from '../constants/link';


export const Solved=(props)=>{
    
  const {addToast}= useToasts();
  const history=useNavigate();
     var array;
    const handleAddrTypeChange = (e) =>{
     e.preventDefault();
    
       array= e.target.value.split(",");
      console.log(array[0]);
      console.log(array[1]);
      console.log(array[2]);
    
      console.log(array);

    }
    
    const solved= async()=>{
      const cookies = new Cookies();
      const fromdata= new FormData();
      const c= cookies.get('token');
     
      fromdata.append('cookies',c);
        fromdata.append("id",array[0]);
        fromdata.append("pid",array[1]);
        fromdata.append("uid",array[2]);

        const response= await fetch(Url+'/solved',{
          method:"POST",
             
         
          
          body: fromdata
          
        });

       

        if(response.status===200){
          addToast("Done",{
            appearances:true,
            autoDismiss:true
          });
          history('/explore')
        }
        else{
          addToast("Invalid Credentials ‼️",{
            appearances:false,
            autoDismiss:true
          });
        }


    }

    return(

        <div className="main-contain">
        <p>Select your one Doubt Buddy and Give some point: </p>
        <d className="options" id="options">
          <select className="hide-option option" id="hide-option"  onChange={e => handleAddrTypeChange(e)} required>
            <option disabled selected hidden>Please Choose...</option>
            {props.solved.map((item,key)=>(
                 <option value={item._id+","+item.problem+","+item.user+","}
                 >{item.hidden}</option>
            ))}
           
           
          </select>
          <div className="button" id="button" onClick={solved}>Done</div>
        </d>
        </div>
    )
}


export default Solved;