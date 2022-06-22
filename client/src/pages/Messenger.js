

import React, { useContext } from 'react';
import {  useEffect, useRef, useState } from "react";
import axios from 'axios';
import Conversation from '../components/conversation/Conversation';
import Message from '../components/message/Message';
import ChatOnline from '../components/chatOnline/ChatOnline';
import io from "socket.io-client";
import { useSelector } from 'react-redux';
import { UidContext } from '../components/AppContext';
import Log from '../components/Log';






const Messenger = () => {
  const uid = useContext(UidContext);
  const user = useSelector((state) => state.userReducer)
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const socket = useRef()
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  
  useEffect(() => {

    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", data => {
       setArrivalMessage({
        sender: data.senderId ,
        text: data.text,
        createdAt: Date.now(),
       });
    });

  },[]);

  useEffect(() => {

 arrivalMessage &&
  currentChat?.members.includes(arrivalMessage.sender) &&
 setMessages((prev)=> [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat])

  useEffect(() => {
  socket.current.emit("addUser", user._id)
    socket.current.on("getUsers", users => {
      console.log(users)
    })
  }, [user]);

 
  


  useEffect(() => {

   
    const getConversations = async () => {

     try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/conversations/${user._id}`)

      setConversations(res.data)
     } catch(err) {

        console.log(err)
     }
    };
getConversations();
  }, [user._id])



 
  
useEffect(() => {
  const getMessages = async ()=> {

    try {

      const res =  await axios.get(`${process.env.REACT_APP_API_URL}api/messages/${currentChat?._id}`)
      setMessages(res.data)
    } catch(err) {

  console.log(err)

    }
  }
  getMessages()
},[currentChat])



const handleSubmit = async (e)=> {
e.preventDefault();
const message = {

  sender: user._id,
  text: newMessage,
  conversationId: currentChat._id,

};
const receiverId = currentChat.members.find((member) => member !== user._id)

socket.current.emit("sendMessage", {
  senderId: user._id,
  receiverId,
  text: newMessage, 
})

try {

  const res = await axios.post(`${process.env.REACT_APP_API_URL}api/messages`, message)

  setMessages([...messages, res.data])
  setNewMessage("")
} catch(err) {

  console.log(err)
}

};





useEffect(() => {
  scrollRef.current?.scrollIntoView({behavior: "smooth"})

},[messages])




    return (

      <>

   {uid ? (
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} currentUser={user} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
           
          </div>
        </div>
      </div>
   
    ) : (
      <div className="profil-page">
      <div className="log-container">
          <Log signin={false} signup={true} />
       
          <div className="img-container">
            <img src="/img/log.svg" alt="img-log" />
          </div>
        </div>
          </div>
    )}
     </>

    );
};

export default Messenger;

