import '../asset/css/solves.css'

import { useToasts } from 'react-toast-notifications';

import { useNavigate } from 'react-router-dom';

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
    const fromdata= new FormData();
    const solved= async()=>{
        fromdata.append("id",array[0]);
        fromdata.append("pid",array[1]);
        fromdata.append("uid",array[2]);

        const response= await fetch('/solved',{
          method:"POST",
             
          credentials:"include",
          
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