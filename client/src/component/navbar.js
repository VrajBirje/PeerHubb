
import  '../asset/css/navbar.css'

import { Link } from "react-router-dom";
import { useEffect, useReducer, useState } from 'react';


export const Navbar=(props)=>{

    
    // console.log("Value of prop "+props.allCookies.Cookies);
    console.log(props.login);

    let l1;
    let l2;
    if(props.login){
       l1=<li ><Link to="/my-profile">Profile</Link></li>
       l2=<li ><Link to="/log-out">Log-out</Link></li>;
    }
    else{
        l1=<li ><Link to="/login">Log-in</Link></li>
        l2=<li ><Link to="/sing-up">Sing-up</Link></li>;
    }

    return(

      
      <nav className="navcontainer1">
      <div className="logo"><Link to="/">Doubt-Mate™</Link></div>
      <input type="checkbox" id="checkbox" />
      <label htmlFor="checkbox" id="icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </label>
      <ul className="ul">
        {/* <li className="li-color"> <Link to="/">Home</Link></li> */}
        <li className="li-color"> <Link to="/explore">Explore</Link></li>
        <li className="li-color"> <Link to="/soon">Contact</Link></li>
        <li className="li-color"> {l1}</li>
        <li className="li-color"> {l2}</li>
      </ul>
    </nav>


        //    <Link to="/explore"></Link>
        //    <Link to="/explore">Explore</Link>
        //    <Link to="/services">Service</Link>
        //    <Link to="/my-profile">Profile</Link>
    )
}

export default Navbar;