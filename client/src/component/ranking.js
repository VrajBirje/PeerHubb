import { useEffect, useState } from 'react';
import '../asset/css/rank.css';

export const Rank=()=>{


    const [user,setUser1]= useState([]);
    const call=async ()=>{
        const response= await fetch('/ranking',{
          method:"GET"
        })

        const data= await response.json();
        setUser1(data.message)
     
        

    }
    useEffect(()=>{
      call();
    },[])

    

    return (

        <div className="container3">
          <header>
            <h1>Top Performer</h1>
          </header>
          <div className="wrapper3">
            <table>
              <thead>
                <th>Rank</th>
                <th>Name</th>
                <th>Points</th>
              </thead>
              <tbody>
              {user.map((user,key)=>(
                <tr>
                    <td>{key}</td>
                    <td>{user.username}</td>
                    <td>{user.point}</td>
                </tr>
              ))}

              </tbody>
            </table>
          </div>
        </div>
      );
}


export default Rank;