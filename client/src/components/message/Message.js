import React from 'react';
import { useSelector } from 'react-redux';


const Message = ({message , own, currentUser} ) => {

  const usersData = useSelector((state) => state.allusersReducer)
    return (
        <div className={own ? "message own" : "message"}>
      <div className="messageTop">
         {
            usersData
              .map((user) => {
                let chemin = "/profile/"
                if (user._id === message.sender) return (<a href={chemin + user.pseudo}>  <img src={user.picture ? user.picture : "./uploads/profil/random-user.png"} alt="" className="messageImg" srcset="" /> </a> )
              
                }
              )}
    
        <p className="messageText">{message.text}</p>
      </div>
     
    </div>
    );
};

export default Message;