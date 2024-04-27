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


// import { useState, useEffect } from 'react';
// import '../asset/css/rank.css';
// import Loading from "./loading";
// import { Url } from '../constants/link';

// const Rank = () => {
//     const [loading, setLoading] = useState(true);
//     const [users, setUsers] = useState([]);

//     const call = async () => {
//         try {
//             const response = await fetch(Url + '/ranking', {
//                 method: "GET"
//             });
//             const data = await response.json();
//             setUsers(data.message);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         call();
//     }, []);

//     const handleChatButtonClick = async (userId) => {
//         var token = document.cookie.substring(6)
//         try {
//             const response = await fetch("http://localhost:7780/chat/", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ userId, cookies: token })
//             });
//             console.log(response)
//             if (response.ok) {
//                 const chatData = await response.json();
//                 // Handle the chat data as needed, such as opening a chat window
//                 console.log("Chat data:", chatData);
//             } else {
//                 throw new Error('Failed to access chat');
//             }
//         } catch (error) {
//             console.error('Error accessing chat:', error);
//         }
//     }

//     if (loading) {
//         return <Loading />;
//     }

//     return (
//         // <div className="container3">
//         //     <header>
//         //         <h1>Top Performer</h1>
//         //     </header>
//         //     <div className="wrapper3">
//         //         <table>
//         //             <thead>
//         //                 <tr>
//         //                     <th>Rank</th>
//         //                     <th>Name</th>
//         //                     <th>Points</th>
//         //                     <th>Action</th>
//         //                 </tr>
//         //             </thead>
//         //             <tbody>
//         //                 {users.map((user, index) => (
//         //                     <tr key={user._id}>
//         //                         <td>{index + 1}</td>
//         //                         <td>{user.username}</td>
//         //                         <td>{user.point}</td>
//         //                         <td>
//         //                             <button onClick={() => handleChatButtonClick(user._id)}>Chat</button>
//         //                         </td>
//         //                     </tr>
//         //                 ))}
//         //             </tbody>
//         //         </table>
//         //     </div>
//         // </div>
//         <div className="w-[100%] flex flex-col justify-center items-center">
//             <div className="w-[90%] flex flex-col gap-4">
//                 <div>
//                     <p className="text-[20px] font-semibold">Top Performer</p>
//                 </div>
//                 <input
//                     placeholder="search here..."
//                     className="rounded-[40px] w-60 h-10 px-5 text-sm"
//                 />
//                 <div className="h-[60vh] max-md:h-[70vh] overflow-y-auto pb-5">
//                     <table className="w-full border-collapse ">
//                         <thead className="bg-[#fff2ab] h-10 sticky top-0">
//                             <tr className="">
//                                 <th className="text-left pl-10">Rank</th>
//                                 <th className="text-left">Name</th>
//                                 <th className="text-left">Points</th>
//                             </tr>
//                         </thead>
//                         <tbody className="h-10">
//                             {users.map((user, index) => (
//                                 <tr className="hover:bg-[#f7f3e2]  border-b border-black py-2" key={user._id}>
//                                     <td className="text-left pl-10">{user.username}</td>
//                                     <td className="text-left font-bold text-[#808080]">#{index + 1}</td>
//                                     <td className="text-left">{user.point}</td>
//                                 </tr>
//                             ))}
//                             <tr className="hover:bg-[#f7f3e2]  border-b border-black py-2">
//                                 <td className="text-left pl-10">Ronit Sonawane</td>
//                                 <td className="text-left font-bold text-[#808080]">#1</td>
//                                 <td className="text-left">100</td>
//                             </tr>
//                             <tr className="hover:bg-[#f7f3e2]  border-b border-black py-2">
//                                 <td className="text-left pl-10">Ronit Sonawane</td>
//                                 <td className="text-left font-bold text-[#808080]">#1</td>
//                                 <td className="text-left">100</td>
//                             </tr>

//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Rank;

import { useEffect, useState } from "react";
// import "../asset/css/rank.css";
import Loading from "./loading";
import { Url } from "../constants/link";
import { useTheme } from './ThemeContext';
export const Rank = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const { theme, changeTheme } = useTheme();
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
                body: JSON.stringify({ userId, cookies: token })
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
        <div className={`w-[100%] h-[90vh] flex flex-col justify-center items-center ${theme === 'dark' ? 'text-white bg-[#121212]':'text-black bg-white'}`}>
            <div className="w-[90%] flex flex-col gap-4">
                <div>
                    <p className="text-[20px] font-semibold">Top Performer</p>
                </div>
                <div className="h-[60vh] max-md:h-[70vh] overflow-y-auto pb-5">
                    <table className="w-full border-collapse ">
                        <thead className="bg-[#fff2ab] h-10 sticky top-0">
                            <tr className="">
                                <th className="text-left pl-10">Rank</th>
                                <th className="text-left">Name</th>
                                <th className="text-left">Points</th>
                                <th className="text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="h-10">
                            {users.map((user, index) => (
                                <tr className={`${theme === 'dark' ? ' bg-[#262525] hover:bg-[#2d2b2b] text-white':'bg-white hover:bg-[#f7f3e2] text-black'}   border-b border-black py-2`} style={{ padding: "0 10px" }} key={user._id}>
                                    <td style={{ paddingTop: "10px", paddingBottom: "10px" }} className="text-left pl-10">{user.username}</td>
                                    <td className="text-left font-bold text-[#808080]">#{index + 1}</td>
                                    <td className="text-left">{user.point}</td>
                                    <td>
                               <button style={{fontSize:"14px",fontWeight:"bold"}} onClick={() => handleChatButtonClick(user._id)}>Chat</button>
                                  </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Rank;
