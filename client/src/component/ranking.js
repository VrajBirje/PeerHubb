// import { useEffect, useState } from 'react';
// import '../asset/css/rank.css';
// import Loading from "./loading";
// import { Url } from '../constants/link';

// export const Rank=()=>{

//   const [loading,setLoading]= useState([true]); 
//     const [user,setUser1]= useState([]);
//     const call=async ()=>{
//         const response= await fetch(Url+'/ranking',{
//           method:"GET"
//         })

//         const data= await response.json();
//         setUser1(data.message)
//         setLoading(false);
     
        

//     }
//     useEffect(()=>{
//       call();
//     },[])

//     if(loading){
//       return <Loading />
//     }

//     return (

//         <div className="container3">
//           <header>
//             <h1>Top Performer</h1>
//           </header>
//           <div className="wrapper3">
//             <table>
//               <thead>
//                 <th>Rank</th>
//                 <th>Name</th>
//                 <th>Points</th>
//               </thead>
//               <tbody>
//               {user.map((user,key)=>(
//                 <tr>
//                     <td>{key}</td>
//                     <td>{user.username}</td>
//                     <td>{user.point}</td>
//                     <td>
//                       <button>chat</button>
//                     </td>
//                 </tr>
//               ))}

//               </tbody>
//             </table>
//           </div>
//         </div>
//       );
// }


// export default Rank;


import { useState, useEffect } from 'react';
import '../asset/css/rank.css';
import Loading from "./loading";
import { Url } from '../constants/link';

export const Rank = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const call = async () => {
        try {
            const response = await fetch(Url + '/ranking', {
                method: "GET"
            });
            const data = await response.json();
            setUsers(data.message);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }

    useEffect(() => {
        call();
    }, []);

    const handleChatButtonClick = async (userId) => {
      var token = document.cookie.substring(6)
        try {
            const response = await fetch("http://localhost:7780/chat/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId , cookies:token})
            });
            console.log(response)
            if (response.ok) {
                const chatData = await response.json();
                // Handle the chat data as needed, such as opening a chat window
                console.log("Chat data:", chatData);
            } else {
                throw new Error('Failed to access chat');
            }
        } catch (error) {
            console.error('Error accessing chat:', error);
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container3">
            <header>
                <h1>Top Performer</h1>
            </header>
            <div className="wrapper3">
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Points</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.point}</td>
                                <td>
                                    <button onClick={() => handleChatButtonClick(user._id)}>Chat</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Rank;
