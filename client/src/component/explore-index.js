import {BrowserRouter as Router, Routes,Route, BrowserRouter} from "react-router-dom";

import Explore from "./explore-home";

import CreatePost from "./create-post";


export function ExploreIndex(){
    return(
        <section>
          {/* <ExploreNav/> */}
            <Routes>
               
               <Route exact path="/*" element={<Explore />}/>
               
             </Routes>
        </section>
    )

}

export default ExploreIndex;
