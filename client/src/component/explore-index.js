import {BrowserRouter as Router, Routes,Route, BrowserRouter} from "react-router-dom";

import Explore from "./explore-home";
// import  Explorenew  from "./explorenew";




export function ExploreIndex({user}){
    return(
        <section>
          {/* <ExploreNav/> */}
            <Routes>
               
               <Route exact path="/*" element={<Explore login={user}/>}/>
               
             </Routes>
        </section>
    )

}

export default ExploreIndex;
