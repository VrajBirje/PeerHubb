
import   '../asset/css/navbar.css';

import { Link } from "react-router-dom";



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
        l2=<li ><Link to="/sing-up">Sign-up</Link></li>;
    }

    return(

      
    //   <nav className="navcontainer1">
    //   <div className="logo"><Link to="/">Doubt-Mate™</Link></div>
    //   <input type="checkbox" id="checkbox" />
    //   <label htmlFor="checkbox" id="icon">
    //     <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
    //   </label>
    //   <ul className="ul">
    //     {/* <li className="li-color"> <Link to="/">Home</Link></li> */}
    //     <li className="li-color" onClick={close}> <Link to="/explore">Explore</Link></li>
    //     <li className="li-color"> <Link to="/soon">Contact</Link></li>
    //     <li className="li-color"> {l1}</li>
    //     <li className="li-color"> {l2}</li>
    //   </ul>
    // </nav>
      
  //   <header>
  //   <div className={styles.navwrapper}>
  //     <div className={styles.logocontainer}>
        
  //     </div>
  //     <nav>
  //       <input className={styles.hidden} type="checkbox" id="menuToggle" />
  //       <label className={styles.menubtn} htmlFor="menuToggle">
  //         <div className={styles.menu} />
  //         <div className={styles.menu} />
  //         <div className={styles.menu} />
  //       </label>
  //       <div className={styles.navcontainer}>
  //         <ul className={styles.navtabs}>
  //           <li className={styles.navtab}>Home</li>
  //           <li className={styles.navtab}>Products</li>
  //           <li className={styles.navtab}>Services</li>
  //           <li className={styles.navtab}>FAQ</li>
  //           <li className={styles.navtab}>Contact</li>
  //           <li className={styles.navtab}>Careers</li>
  //         </ul>
  //       </div>
  //     </nav>
  //   </div>
  // </header>

  <header>
  <div className="navwrapper">
    <div className="logocontainer">
       <div className="maintag">  Doubt-Mate </div>
    </div>
    <nav>
      <input className="hidden" type="checkbox" id="menuToggle" />
      <label className="menubtn" htmlFor="menuToggle">
        <div className="menu" />
        <div className="menu" />
        <div className="menu" />
      </label>
      <div className="navcontainer">
        <ul className="navtabs">
          
        <li className="navtab"> <Link to="/">Home</Link></li> 
        <li className="navtab"> <Link to="/explore">Explore</Link></li>
         <li className="navtab"> <Link to="/library">E-Library</Link></li>
         <li className="navtab"> {l1}</li>
        <li className="navtab"> {l2}</li>



          {/* <li className="navtab">Home</li>
          <li className="navtab">Products</li>
          <li className="navtab">Services</li>
          <li className="navtab">FAQ</li>
          <li className="navtab">Contact</li>
          <li className="navtab">Careers</li> */}
        </ul>
      </div>
    </nav>
  </div>
</header>



    )
}

export default Navbar;