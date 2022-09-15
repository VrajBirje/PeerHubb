import {BrowserRouter as Router, Routes,Route, BrowserRouter} from "react-router-dom";
import './App.css';
import React, {useEffect,useState} from 'react';
import Home from './component/home';
import Navbar from './component/navbar';
import ExploreIndex from "./component/explore-index";
import Singup from "./component/singup";
import Login from "./component/login";

import {withCookies} from 'react-cookie';
import CreatePost from "./component/create-post";
import Userprofile from "./component/user-profile";
import EachPost from "./component/each-post";
import Solved from "./component/solved";
import Rank from "./component/ranking";
import Logout from "./component/logout";
import Soon from "./component/soon";
import { CookiesProvider } from "react-cookie";
import Cookies from 'universal-cookie';
import { Url } from "./constants/link";



const  App=(props)=> {
  
 

  
    
    const [login, islogin] = useState([])
    const [solved, setSolved] = useState([]);
   
   


   const checkloginstatus=async()=>{
        try{
          const cookies = new Cookies();
          const fromdata= new FormData();
          const c= cookies.get('token');
          console.log(c);
          fromdata.append('cookies',c);
          const response= await fetch(Url+'/verify-user',{
            method:"POST",
             body:fromdata
            
           });
             
             const data= await response.json();
            
             console.log(response);
              islogin(data.message);
              console.log(login);
            }
            

         catch(err){
            

         }   
    }

    useEffect(()=>{
        checkloginstatus();
    },[])
    return (

      <CookiesProvider>   
    <div className="App">
      

      <Navbar login={login} />
       {/* <h1>{cookies}</h1> */}
   
        <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/explore/*" element={<ExploreIndex />}/>
            <Route exact path="/sing-up" element={<Singup />}/>
            <Route exact path="/login" element={<Login login={islogin}/>}/>
            <Route exact path="/create-post" element={<CreatePost />}/>
            <Route exact path="/my-profile" element={<Userprofile />}/>
            <Route exact path="/post/:postId" element={<EachPost setSolved={setSolved}  />}/>
            <Route exact path="/solved" element={<Solved solved={solved} />}/>
            <Route exact path="/rank" element={<Rank />}/>
            <Route exact path="/log-out" element={<Logout login={islogin}/>}/>
            <Route exact path="/soon" element={<Soon/>}/>
       


         </Routes> 
    
    </div>
    </CookiesProvider>
    )
  
}


export default withCookies(App);