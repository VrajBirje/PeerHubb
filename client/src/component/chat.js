import React, { useState, useEffect } from 'react';
import { FaRegUser } from "react-icons/fa";
import { Url } from '../constants/link';

export default function Chat({ user }) {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChat, setSelectedChat] = useState({});
    const [messageSend, setMessageSend] = useState("");
    const [messages, setMessages] = useState([]);
    const [grpName, setGrpName] = useState("Grp Name")
    const [showCreateModal, setShowCreateModal] = useState(false); // State to manage modal visibility
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const currentId = user._id;
    console.log(user)
    console.log(currentId)

    var token = document.cookie.substring(6);
    useEffect(() => {
        // Fetch chats here and set them to the state
        fetchChats();
    }, []);

    const [users, setUsers] = useState([]);

    const call = async () => {
        try {
            const response = await fetch(Url + '/ranking', {
                method: "GET"
            });
            const data = await response.json();
            setFilteredUsers(data.message);
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

    const fetchChats = async () => {
        try {
            const response = await fetch('http://localhost:7780/chat/fetch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // Add any other headers if required
                },
                body: JSON.stringify({ cookies: token })
            });
            console.log("response");
            if (response.ok) {
                const data = await response.json();
                setChats(data);
                console.log("data");
                console.log(data);
            } else {
                throw new Error('Failed to fetch chats');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChatNameClick = (chat) => {
        setSelectedChat(chat);
        // Fetch messages for the selected chat
        fetchMessages(chat._id);
    };

    const fetchMessages = async (chatId) => {
        try {
            const response = await fetch(`http://localhost:7780/message/${chatId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cookies: token })
            });
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
                console.log(data)
            } else {
                throw new Error('Failed to fetch messages');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleMessageSend = async () => {
        try {
            const response = await fetch('http://localhost:7780/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // Add any other headers if required
                },
                body: JSON.stringify({
                    chatId: selectedChat._id,
                    content: messageSend,
                    cookies: token
                })
            });
            console.log(response);
            if (response.ok) {
                // Handle successful message send
                console.log('Message sent successfully');
                // Clear the message input field
                setMessageSend("");
                // Refresh messages for the selected chat
                fetchMessages(selectedChat._id);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleSearchChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        if (searchTerm === '') {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(user =>
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
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        }
        console.log(selectedUsers);
    };

    const handleCreateGroup = async () => {
        try {
            const response = await fetch('http://localhost:7780/chat/group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: currentId,
                    cookies: token,
                    name: grpName,
                    users: JSON.stringify(selectedUsers)
                })
            });
            if (response.ok) {
                console.log('Group created successfully');
                // Optionally, you can update the state or perform any other actions after group creation
            } else {
                throw new Error('Failed to create group');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="chatcontainer" style={{ width: "100vw", display: "flex", alignItems: "center" }}>
            <div className='chats' style={{ width: "20%", height: "91.5vh", backgroundColor: "lightblue", position: "relative" }}>
                {/* {chats.map(chat => (
                    <div key={chat._id} className="chat" style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => handleChatNameClick(chat)}>
                        <FaRegUser />
                        <p className='p1'>{chat.users[0].username}</p>
                       
                    </div>
                ))} */}
                <button className="createGroup" style={{ position: "absolute", padding: "5px", right: "10", bottom: "20" }} onClick={() => setShowCreateModal(true)}>Create</button>
                <div className="creategrp-modal" style={{ display: showCreateModal ? 'block' : 'none', height: "500px", width: "500px", position: "absolute", right: "-700", top: "50", backgroundColor: "red", }}>
                    <div className="creategrp-modal2" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                        <button style={{ padding: "5px", width: "100px" }} onClick={() => setShowCreateModal(false)}>close</button>
                        <input type="text" placeholder='group name' value={grpName} onChange={(e) => setGrpName(e.target.value)} />
                        <input type="text"
                            className="grpMembersSearch"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <div className="userSelect" style={{ height: "100px", overflowY: "auto" }}>
                            {filteredUsers.map(user => (
                                <div key={user._id} className="user" style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(user._id)}
                                        onChange={() => handleUserCheckboxChange(user._id)}
                                    />
                                    <FaRegUser />
                                    <p className='p1'>{user.username}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button style={{ width: "200px" }} onClick={() => handleCreateGroup()}>Create GRoup</button>
                </div>
                {chats.map(chat => (
                    <div key={chat._id} className="chat" style={{ display: "flex", alignItems: "center", cursor: "pointer" ,border:"1px solid black"}} onClick={() => handleChatNameClick(chat)}>
                        {/* Render chat details here */}
                        <FaRegUser style={{backgroundColor:"white"}}/>
                        {/* Map through users array */}
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <div style={{display:"flex", alignItems:"center"}}>

                                {chat.isGroupChat && chat.chatName}
                                {/* show chatname only when the chat is group */}
                                {chat.users.map(user => (   // show username only when it is a personal chat
                                    // Check if user ID is not equal to current user ID
                                    user._id !== currentId && (
                                        <p key={user._id}>{user.username}</p>
                                    )
                                ))}
                            </div>
                            {chat.latestMessage.sender.email}:{chat.latestMessage.content}
                        </div>

                        {/* Render other chat details as needed */}
                    </div>
                ))}
            </div>
            <div className="messageSection" style={{ width: "80%", height: "91.5vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div className="chatName" style={{ width: "100%", padding: "5px 0", backgroundColor: "blue", color: "black" }}>
                    {selectedChat && <p>{selectedChat.chatName}</p>}
                </div>
                <div className="messages" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "20px", overflowY: "auto" }}>
                    {messages.map(message => (
                        <div key={message._id} style={{ justifyContent: `${message.sender._id === currentId ? 'flex-start' : 'flex-end'}`, display: "flex", alignItems: "center", gap: "20px" }}>
                            <div style={{ fontSize: "12", fontWeight: "bold", color: "black", backgroundColor: "white" }}>{message.sender.email}  :</div>
                            {message.content}
                        </div>
                    ))}
                </div>
                <div className="sendbox">
                    <input type="text" value={messageSend} onChange={(e) => setMessageSend(e.target.value)} />
                    <button onClick={handleMessageSend}>Send</button>
                </div>
            </div>
        </div>
    );
}
