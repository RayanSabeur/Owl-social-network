import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, UnfollowUser } from '../../actions/user.action';
import { isEmpty } from '../Utils';

const FollowHandler = ({idToFollow, type}) => {
  
  
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = () => {
  dispatch(followUser(userData._id , idToFollow))
 setIsFollowed(true);
    }

    const handleUnfollow = () => {

        dispatch(UnfollowUser(userData._id, idToFollow)) // idtofollow c enft l'id a unfollow
        setIsFollowed(false);
    }

useEffect(() => {
if(!isEmpty(userData.following)) //si userdata.following nest pas vide tu lance la fonction
{
    if(userData.following.includes(idToFollow)) // si notre user actuel le suit deja
    {
        setIsFollowed(true);
    } else setIsFollowed(false);
}
},[userData, idToFollow])

    return (
      <>
      {isFollowed  &&  !isEmpty(userData) &&  (
   <span onClick={handleUnfollow}>
   {type === "suggestion" && <button className='unfollow-btn'>abonné</button>}
   {type === "card" && <img src="./img/icons/checked.svg" />}
  </span>
      )}
   { isFollowed === false && (
          <span onClick={handleFollow}>
        {type === "suggestion" && <button className='follow-btn'>suivre</button>}  
        {type === "card" && <img src="./img/icons/check.svg" />}
      </span>
   )}
      </>
    );
};

export default FollowHandler;