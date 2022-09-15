import '../asset/css/create-post.css';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Url } from '../constants/link';








export function CreatePost(){

  const[buttonIn,setbuttonIn]= useState(false);
  const {addToast}= useToasts();
  const [username,setUsername]= useState('');
  const history=useNavigate();

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
         setUsername(a);
       

        
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

    
    const options = ["Problem", "Group Discussion", "Study Guide","Feedback & Support"];
    const [user,setUser]= useState({
    heading:"",subject:"",fieldname:"",message:"",
  });
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [type, settype] = useState("");
  const [hidden, sethidden] = useState("");
 
  
  let name,value;
  const fromdata= new FormData();
  const handleInputs=(e)=>{
     
  
    name=e.target.name;
    value=e.target.value;

    setUser({...user,[name]:value})

  }


  const handleInputChange = (event) => {
       event.preventDefault();
       
       setSelectedFiles(event.target.files[0]);
      
  
   

  }

  const CreatePost= async(e)=>{
    e.preventDefault();
    setbuttonIn(true);
    const cookies = new Cookies();
    const c= cookies.get('token');
   
    fromdata.append('cookies',c);
   
    const {heading,subject,fieldname,message}=user;
    fromdata.append('img',selectedFiles);
    fromdata.append('heading',heading);
    fromdata.append('subject',subject);
    fromdata.append('fieldname',fieldname);
    fromdata.append('message',message);
    fromdata.append('type',type);
    fromdata.append('hidden',hidden);

    const res= await fetch(Url+'/create-post',{
      method:"POST",
         
      
      
      body: fromdata
      
    });

    
    if(res.status===200){
      addToast("Post Created",{
        appearances:true,
        autoDismiss:true
      });
      setbuttonIn(false);
      history('/explore')
    }
    else{
      setbuttonIn(false);
     return  addToast("Server Error ‼️",{
        appearances:false,
        autoDismiss:true
      });
    }
 }



    return(
      <div>
      <form className="my-form" method="POST">
        <div className="container">
          <h1>Create A Post</h1>
          <ul>
          <li>
            <select
                onChange={(e) => sethidden(e.target.value)}
                 required
                 >
                   <option  disabled selected hidden>Please Choose...</option>
                <option >Post as Anonymous</option>
                <option>Post as {username}</option>
                
               </select>



             
            </li>



            <li>
            <select
                onChange={(e) => settype(e.target.value)} defaultValue={value}
                 required
                 >
                  <option  disabled selected hidden>Please Choose...</option>  
                <option>Problem</option>
                <option>Career</option>
                <option>Study Guide</option>
                <option>Group Discussion</option>
                <option>Feedback And Support</option>
               </select>



             
            </li>
            <li>
              <div className="grid grid-2">
                <input type="text" placeholder="Heading (Required)" name="heading" required 
                     value={user.heading}
                     onChange={handleInputs}
                />  
                <input type="text" placeholder="Subject (Required) " name="subject" 
                    value={user.subject}
                    onChange={handleInputs}
                />
              </div>
            </li>
            <li>
              <div className="grid grid-2">
                 <input onChange={handleInputChange} type="file" name="filefield" placeholder="Max one Img"/>
              </div>
            </li>    
            <li>
              <textarea placeholder="Message (Required)" defaultValue={""} required name="message"
                 value={user.message}
                 onChange={handleInputs}
              />
            </li>   
             
            <li>
              <div className="grid grid-3">
               
                <button className="btn-grid" onClick={CreatePost} type="submit" disabled={buttonIn} >
                    <span className="front">{buttonIn? 'Please Wait..':'Create'}</span>
                </button>
               
              </div>
            </li>    
          </ul>
        </div>
      </form>
     
    </div>
    

       
    )
}

export default CreatePost;