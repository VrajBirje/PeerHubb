import React, { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { Url } from "../constants/link";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaBars } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import io from "socket.io-client"
import { useTheme } from './ThemeContext';

const ENDPOINT = "http://localhost:7780"
let socket, selectedChatCompare;

export default function Chat({ user }) {
    const { theme, changeTheme } = useTheme();
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChat, setSelectedChat] = useState({});
    const [messageSend, setMessageSend] = useState("");
    const [messages, setMessages] = useState([]);
    const [grpName, setGrpName] = useState("Grp Name");
    const [showCreateModal, setShowCreateModal] = useState(false); // State to manage modal visibility
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [openNav, setOpenNav] = useState(true);
    const [socketConnected, setSocketConnected] = useState(false)
    const [openChat, setOpenChat] = useState(false);
    const currentId = user._id;

    var token = document.cookie.substring(6);
    useEffect(() => {
        if (user) {
            socket = io(ENDPOINT)
            socket.emit("setup", user);
            socket.on("connection", () => {
                setSocketConnected(true)
            })
        }
    }, [user])

    useEffect(() => {
        // Fetch chats here and set them to the state
        fetchChats();
        selectedChatCompare = selectedChat
    }, [selectedChat]);

    useEffect(() => {
        socket.on("messsage received", (newMessageReceived) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                // give notification
                console.log("notification")
                alert("notifications")
            } else {
                console.log("Setting message")
                setMessages([...messages, newMessageReceived])
            }
        });
    })

    const [users, setUsers] = useState([]);

    const call = async () => {
        try {
            const response = await fetch(Url + "/ranking", {
                method: "GET",
            });
            const data = await response.json();
            setFilteredUsers(data.message);
            setUsers(data.message);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        call();
    }, []);

    const fetchChats = async () => {
        try {
            const response = await fetch("http://localhost:7780/chat/fetch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Add any other headers if required
                },
                body: JSON.stringify({ cookies: token }),
            });
            if (response.ok) {
                const data = await response.json();
                setChats(data);
            } else {
                throw new Error("Failed to fetch chats");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChatNameClick = (chat) => {
        setSelectedChat(chat);
        setOpenChat(true);
        // Fetch messages for the selected chat
        fetchMessages(chat._id);
    };

    const fetchMessages = async (chatId) => {
        try {
            const response = await fetch(`http://localhost:7780/message/${chatId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cookies: token }),
            });
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
                socket.emit("join chat", chatId)
            } else {
                throw new Error("Failed to fetch messages");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleMessageSend = async () => {
        try {
            const response = await fetch("http://localhost:7780/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Add any other headers if required
                },
                body: JSON.stringify({
                    chatId: selectedChat._id,
                    content: messageSend,
                    cookies: token,
                }),
            });


            if (response.ok) {
                // Handle successful message send
                console.log("Message sent successfully");
                // Clear the message input field
                setMessageSend("");
                // Refresh messages for the selected chat
                fetchMessages(selectedChat._id);
                let data = await response.json();
                socket.emit("new message", data)
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleSearchChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        if (searchTerm === "") {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter((user) =>
                user.username.toLowerCase().includes(searchTerm)
            );
            setFilteredUsers(filtered);
        }
    };

    const handleUserCheckboxChange = (userId) => {
        const index = selectedUsers.indexOf(userId);
        if (index === -1) {
            setSelectedUsers([...selectedUsers, userId]);
        } else {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        }
        console.log(selectedUsers);
    };

    const handleCreateGroup = async () => {
        try {
            const response = await fetch("http://localhost:7780/chat/group", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: currentId,
                    cookies: token,
                    name: grpName,
                    users: JSON.stringify(selectedUsers),
                }),
            });
            if (response.ok) {
                console.log("Group created successfully");
                alert("grou created successfully")
                setShowCreateModal(false);
                // Optionally, you can update the state or perform any other actions after group creation
            } else {
                throw new Error("Failed to create group");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        // <div
        //     className="chatcontainer"
        //     style={{ width: "100vw", display: "flex", alignItems: "flex-start", position: "relative" , height:"85vh"}}
        // >
        //     <div
        //         className="chats bg-yellow-100 min-[972px]:block max-[972px]:absolute left-0 top-0 w-[20%] max-[972px]:w-[100%]"
        //         style={{ display: openNav ? "block" : "none", height: "100%", overflowY: "auto", scrollbarWidth: "none" }}
        //     >
        //         {
        //             openNav && (
        //                 <div className="hidden max-[972px]:block">
        //                     <IoCloseCircleOutline size={24} onClick={() => setOpenNav(false)} />
        //                 </div>
        //             )
        //         }
        //         {/* {chats.map(chat => (
        //             <div key={chat._id} className="chat" style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => handleChatNameClick(chat)}>
        //                 <FaRegUser />
        //                 <p className='p1'>{chat.users[0].username}</p>

        //             </div>
        //         ))} */}
        //         <button
        //             className="flex absolute gap-2 items-center bottom-10 left-2 bg-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-500"
        //             onClick={() => setShowCreateModal(true)}
        //         >
        //             <span className="text-[14px] font-semibold">New Group</span>
        //             <HiOutlineUserGroup />
        //         </button>

        //         <div
        //             className="shadow-xl flex flex-col justify-between  p-10 border rounded-md bg-white"
        //             style={{
        //                 display: showCreateModal ? "block" : "none",
        //                 height: "500px",
        //                 width: "500px",
        //                 position: "absolute",
        //                 right: "-700",
        //                 top: "50",
        //             }}
        //         >
        //             <div className="flex flex-col justify-between h-[100%]">
        //                 <input
        //                     className="border border-violet-500 p-2  w-[100%] rounded-md"
        //                     type="text"
        //                     placeholder="group name"
        //                     value={grpName}
        //                     onChange={(e) => setGrpName(e.target.value)}
        //                 />
        //                 <input
        //                     type="text"
        //                     className="border border-violet-500 p-2 w-[100%] rounded-md"
        //                     placeholder="Search users..."
        //                     value={searchTerm}
        //                     onChange={handleSearchChange}
        //                 />
        //                 <div
        //                     className="userSelect"
        //                     style={{ height: "200px", overflowY: "auto" }}
        //                 >
        //                     {filteredUsers.map((user) => (
        //                         <div
        //                             key={user._id}
        //                             className="user"
        //                             style={{
        //                                 display: "flex",
        //                                 alignItems: "center",
        //                                 cursor: "pointer",
        //                             }}
        //                         >
        //                             <input
        //                                 type="checkbox"
        //                                 checked={selectedUsers.includes(user._id)}
        //                                 onChange={() => handleUserCheckboxChange(user._id)}
        //                             />
        //                             <FaRegUser />
        //                             <p className="p1">{user.username}</p>
        //                         </div>
        //                     ))}
        //                 </div>
        //                 <div className="flex justify-between font-semibold">
        //                     <button
        //                         style={{ width: "200px" }}
        //                         className="w-max px-4 py-2 bg-[#FFD700] rounded-md"
        //                         onClick={() => handleCreateGroup()}
        //                     >
        //                         Create Group
        //                     </button>
        //                     <button
        //                         style={{ padding: "5px", width: "100px" }}
        //                         onClick={() => setShowCreateModal(false)}
        //                         className="w-max px-4 py-2 bg-[#a22525] text-white rounded-md"
        //                     >
        //                         close
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>

        //         {chats.map((chat) => (
        //             <div
        //                 key={chat._id}
        //                 className="flex items-center justify-start gap-2 h-max cursor-pointer border-b pb-2"
        //                 onClick={() => handleChatNameClick(chat)}
        //             >
        //                 {/* Render chat details here */}
        //                 <div className="bg-white rounded-[50%] p-2">
        //                     <FaRegUser size={28} />
        //                 </div>
        //                 {/* Map through users array */}
        //                 <div className="h-20 flex flex-col">
        //                     <div style={{ display: "flex", alignItems: "center" }}>
        //                         <p>{chat.isGroupChat && chat.chatName}</p>

        //                         {/* show chatname only when the chat is group */}
        //                         {!chat.isGroupChat &&
        //                             chat.users.map(user =>
        //                                 // Check if user ID is not equal to current user ID
        //                                 user._id !== currentId && (
        //                                     <p key={user._id}>{user.username}</p>
        //                                 )
        //                             )
        //                         }
        //                     </div>
        //                     <div className="text-[#808080] text-[10px]">
        //                         {chat.latestMessage?.sender.username}:{" "}
        //                         {chat.latestMessage?.content}
        //                     </div>
        //                 </div>

        //                 {/* Render other chat details as needed */}
        //             </div>
        //         ))}
        //     </div>
        //     <div
        //         className="min-[972px]:w-[80%] w-[100%]"
        //         style={{
        //             height: "100%",
        //             display: "flex",
        //             flexDirection: "column",
        //             justifyContent: "space-between",
        //         }}
        //     >
        //         <div className="bg-[#FFD700] w-[100%] px-2 font-bold flex justify-self-start gap-5 pr-5 items-center">
        //             <div className="bg-white rounded-[50%] p-2">
        //                 <FaRegUser size={28} />
        //             </div>
        //             {(selectedChat && selectedChat.isGroupChat) && <p>{selectedChat.chatName}</p>}
        //             {(selectedChat && !selectedChat.isGroupChat) && <p>
        //                 {selectedChat.users.map(user =>
        //                                 // Check if user ID is not equal to current user ID
        //                                 user._id !== currentId && (
        //                                     <p key={user._id}>{user.username}</p>
        //                                 )
        //                             )}
        //             </p>}
        //             {!openNav && (
        //                 <div className="hidden max-[972px]:block">
        //                     <FaBars size={24} onClick={() => setOpenNav(true)} />
        //                 </div>
        //             )}
        //             {
        //                 openNav && (
        //                     <div className="hidden max-[972px]:block">
        //                         <IoCloseCircleOutline size={24} onClick={() => setOpenNav(false)} />
        //                     </div>
        //                 )
        //             }
        //         </div>
        //         <div
        //             className="messages"
        //             style={{
        //                 height: "100%",
        //                 display: "flex",
        //                 flexDirection: "column",
        //                 justifyContent: "flex-start",
        //                 gap: "20px",
        //                 overflowY: "auto",
        //             }}
        //         >
        // {messages.map((message) => (
        //     <div
        //         key={message._id}
        //         className={`flex px-2 p-1 pr-5  ${message?.sender?._id === currentId
        //             ? "justify-end "
        //             : "justify-start "
        //             }`}
        //     >
        //         <div
        //             className={`flex flex-col w-max ${message?.sender?._id === currentId
        //                 ? "justify-end bg-[#fbbf24] rounded-md px-4 py-2"
        //                 : "justify-start bg-[#f0d48c] rounded-md px-4 py-2"
        //                 }`}
        //         >
        //              <span className="text-[11px] font-semibold">
        //                 {message?.sender?.username}{" "}
        //             </span>
        //             <span>{message?.content}</span>
        //         </div>
        //     </div>
        // ))}
        //         </div>
        //         <div className="mb-2  flex justify-between gap-2 w-[100%] pr-10 pl-2">
        //             <input
        //                 type="text"
        //                 value={messageSend}
        //                 onChange={(e) => setMessageSend(e.target.value)}
        //                 className="border border-violet-500 w-[90%] rounded-md p-2"
        //                 placeholder="Enter Your Messsage"
        //             />
        //             <button
        //                 onClick={handleMessageSend}
        //                 className="rounded-md bg-[#FFD700] px-4 py-2"
        //             >
        //                 Send
        //             </button>
        //         </div>
        //     </div>
        // </div>
        <div
            className={`${theme === 'dark' ? ' bg-[#121212]' : ' bg-white'} chatcontainer`}
            style={{ width: "100vw", display: "flex", alignItems: "flex-start", position: "relative", height: "85vh" }}
        >
            <div
                className="chats bg-yellow-100 min-[972px]:block max-[972px]:absolute left-0 top-0 w-[20%] max-[972px]:w-[100%]"
                style={{ display: openNav ? "block" : "none", height: "100%", overflowY: "auto", scrollbarWidth: "none" }}
            >
                {
                    openNav && (
                        <div className="hidden max-[972px]:block">
                            <IoCloseCircleOutline size={24} className="text-black" onClick={() => setOpenNav(false)} />
                        </div>
                    )
                }
                {/* {chats.map(chat => (
                    <div key={chat._id} className="chat" style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => handleChatNameClick(chat)}>
                        <FaRegUser />
                        <p className='p1'>{chat.users[0].username}</p>
                       
                    </div>
                ))} */}
                <button
                    className="flex absolute gap-2 items-center bottom-10 left-2 bg-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-500"
                    onClick={() => setShowCreateModal(true)}
                >
                    <span className="text-[14px] font-semibold">New Group</span>
                    <HiOutlineUserGroup />
                </button>

                <div
                //group modal
                    className="shadow-xl flex flex-col justify-between  p-10 border rounded-md bg-white"
                    style={{
                        display: showCreateModal ? "block" : "none",
                        height: "500px",
                        width: "500px",
                        position: "absolute",
                        right: "400",
                        top: "50",
                    }}
                >
                    <div className="flex flex-col justify-between h-[100%]">
                        <input
                            className="border border-violet-500 p-2  w-[100%] rounded-md"
                            type="text"
                            placeholder="group name"
                            value={grpName}
                            onChange={(e) => setGrpName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border border-violet-500 p-2 w-[100%] rounded-md"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <div
                            className="userSelect"
                            style={{ height: "200px", overflowY: "auto" }}
                        >
                            {filteredUsers.map((user) => (
                                <div
                                    key={user._id}
                                    className="user"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(user._id)}
                                        onChange={() => handleUserCheckboxChange(user._id)}
                                    />
                                    <FaRegUser />
                                    <p className="p1">{user.username}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between font-semibold">
                            <button
                                style={{ width: "200px" }}
                                className="w-max px-4 py-2 bg-[#FFD700] rounded-md"
                                onClick={() => handleCreateGroup()}
                            >
                                Create Group
                            </button>
                            <button
                                style={{ padding: "5px", width: "100px" }}
                                onClick={() => setShowCreateModal(false)}
                                className="w-max px-4 py-2 bg-[#a22525] text-white rounded-md"
                            >
                                close
                            </button>
                        </div>
                    </div>
                </div>

                {chats.map((chat) => (
                    <div
                        key={chat._id}
                        className="flex items-center justify-start gap-2 h-max cursor-pointer border-b pb-2"
                        onClick={() => handleChatNameClick(chat)}
                    >
                        {/* Render chat details here */}
                        <div className="bg-white rounded-[50%] p-2">
                            <FaRegUser size={28} />
                        </div>
                        {/* Map through users array */}
                        <div className="h-20 flex flex-col">
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <p>{chat.isGroupChat && chat.chatName}</p>

                                {/* show chatname only when the chat is group */}
                                {!chat.isGroupChat &&
                                    chat.users.map(user =>
                                        // Check if user ID is not equal to current user ID
                                        user._id !== currentId && (
                                            <p key={user._id}>{user.username}</p>
                                        )
                                    )
                                }
                            </div>
                            <div className="text-[#808080] text-[10px]">
                                {chat.latestMessage?.sender.username}:{" "}
                                {chat.latestMessage?.content}
                            </div>
                        </div>

                        {/* Render other chat details as needed */}
                    </div>
                ))}
            </div>
            {
                openChat &&
                <div
                    className="min-[972px]:w-[80%] w-[100%]"
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <div className="bg-[#FFD700] w-[100%] px-2 font-bold flex justify-self-start gap-5 pr-5 items-center">
                        <div className="bg-white rounded-[50%] p-2">
                            <FaRegUser size={28} />
                        </div>
                        {selectedChat && <p>{selectedChat.chatName}</p>}
                        {!openNav && (
                            <div className="hidden max-[972px]:block">
                                <FaBars size={24} className="text-black" onClick={() => setOpenNav(true)} />
                            </div>
                        )}
                        {
                            openNav && (
                                <div className="hidden max-[972px]:block">
                                    <IoCloseCircleOutline className="text-black" size={24} onClick={() => setOpenNav(false)} />
                                </div>
                            )
                        }
                    </div>
                    <div
                        className="messages"
                        style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            gap: "20px",
                            overflowY: "auto",
                            scrollbarWidth:"none"
                        }}
                    >
                        {messages.map((message) => (
                            <div
                                key={message._id}
                                className={`flex px-2 p-1 pr-5  ${message?.sender?._id === currentId
                                    ? "justify-end "
                                    : "justify-start "
                                    }`}
                            >
                                <div
                                    className={`flex flex-col w-max ${message?.sender?._id === currentId
                                        ? "justify-end bg-[#fbbf24] rounded-md px-4 py-2"
                                        : "justify-start bg-[#f0d48c] rounded-md px-4 py-2"
                                        }`}
                                >
                                    <span className="text-[11px] font-semibold">
                                        {message?.sender?.username}{" "}
                                    </span>
                                    <span>{message?.content}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mb-8  flex justify-between gap-2 w-[100%] pr-10 pl-2">
                        <input
                            type="text"
                            value={messageSend}
                            onChange={(e) => setMessageSend(e.target.value)}
                            className={`${theme === 'dark' ? ' bg-[#262525] text-white' : ' bg-white'} border border-violet-500 w-[90%] rounded-md p-2`}
                            placeholder="Enter Your Messsage"
                        />
                        <button
                            onClick={handleMessageSend}
                            className="rounded-md bg-[#FFD700] px-4 py-2"
                        >
                            Send
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}