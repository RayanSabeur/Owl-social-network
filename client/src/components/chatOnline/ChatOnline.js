import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
      
      const getFriends = async () => {

              const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/friend/${currentId}`);
            setFriends(res.data);
  }
      getFriends();
    },[currentId]);

    console.log(friends)
 
    useEffect(() => {
      setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
      
    }, [friends, onlineUsers]);
   

   console.log(onlineUsers)

   

    return (
      <div className="chatOnline">
        {onlineFriends.map((o) => (
          <div className="chatOnlineFriend"  >
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={
                  o?.picture
                    ?  o.picture
                    :  "./uploads/profil/random-user.png"
                }
                alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{o?.pseudo}</span>
          </div>
        ))}
      </div>
    );
};

export default ChatOnline;