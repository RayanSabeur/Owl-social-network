import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { UidContext } from '../AppContext';

const Conversation = ({conversation, currentUser }) => {

  const [user, setUser] = useState(null);

  let chemin = "/profile/";

  useEffect(()=> {

const friendId = conversation.members.find((m)=> m !== currentUser._id )

const getUser = async () => {

  try {
    const res = await axios(`${process.env.REACT_APP_API_URL}api/user?userId=${friendId}`);

  setUser(res.data)
  console.log(user)
 
  } catch (err) {

    console.log(err);

  }
};
getUser();
}, [ currentUser, conversation]);
 


return (
        <div className="conversation">
      <img
        className="conversationImg"
        src={user?.picture ? user.picture : "./uploads/profil/random-user.png"}
        alt=""
      />
      <span className="conversationName">{user?.pseudo}</span>
    </div>
    );
};

export default Conversation;
