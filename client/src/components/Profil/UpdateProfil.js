import React from 'react';
import LeftNav from '../LeftNav';
import  { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadImg from './UploadImg';
import {useState} from 'react'
import { updateBio } from '../../actions/user.action';
import { dateParser } from '../Utils';
import FollowHandler from './FollowHandler';
import { UidContext } from '../../components/AppContext';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const UpdateProfil = ({user}) => {

     const [bio, setBio] = useState("");
     const [updateForm, setUpdateForm] = useState(false);
     const dispatch = useDispatch();
     const [followingPopup, setFollowingPopup] = useState(false);
     const [followersPopup, setFollowersPopup] = useState(false);
     const path = ".";
     const uid = useContext(UidContext);
 const usersData = useSelector((state) => state.allusersReducer);
    const userData = useSelector((state) => state.userReducer);
    let chemin = "/profile/";
     
     
     
    const handleUpdate = () => {
     dispatch(updateBio(userData._id, bio));
     setUpdateForm(false);

    }

    const handleConversation = async (e) => {

    e.preventDefault();
         
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/conversations`,
        data: {
          senderId: userData._id,
          receiverId: user._id,
        }
  
      }).then((res) => {
        console.log(res.data)
       
      });
      window.location = '/messenger';

 }; 

    return (
    <div className="profil-container">
        <LeftNav />
        <h1> Profil de {user.pseudo}</h1>
     <div className="update-container">
         <div className="left-part">
            <h3>Photo de profil</h3>
            <img src={path + user.picture} alt="user-pic" className="img-profil"/>
                 
            {uid === user._id ? (   <UploadImg user={user}/> ) : 
            (<div>  <img  src="/img/icons/enveloppe.png" className='img-share'  onClick={handleConversation} alt="envoyer un message privé" /> </div>
             )}
          {uid === user._id ? ("") :
          (<div>  Envoyer un message privé </div>
            )}
                                     
          </div>
          <div className="right-part">
            <div className="bio-update">
              <h3>Bio</h3>
              {updateForm === false && (
                <>          
                  {uid === user._id ? (
                    <>
                     <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p> 
                   <button onClick={() => setUpdateForm(!updateForm)}>
                    Modifier bio
                  </button>
                  </> ):
                    (<p >{user.bio}</p>) 
                     }
                
                </>
                     
              )}
                    
              {updateForm &&  (  uid === user._id ? 
                 ( <>
                  <textarea
                    type="text"
                    defaultValue={user.bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                  <button onClick={handleUpdate}>Valider modifications</button>
                </> ):( "")
              )}
            </div>
            <h4>Membre depuis le : {dateParser(user.createdAt)}</h4>
            <h5 onClick={() => setFollowingPopup(true)}>
              Abonnements : {user.following ? user.following.length : ""}

            </h5>
            <h5 onClick={() => setFollowersPopup(true)}>
              Abonnés : {user.followers ? user.followers.length : ""}

            </h5>
          </div>
        </div>

{ followingPopup && (
<div className='popup-profil-container'>  
<div className='modal'>
    <h3>Abonnement</h3>
    <span className='cross' onClick={() => setFollowingPopup(false)}>&#10005;
    
    </span>

    <ul>
         
{usersData.map((use) => {

for (let i = 0; i < user.following.length; i++) {
    if (use._id === user.following[i]) {

        return (
            <li key={use._id}>
              <NavLink to={chemin + use.pseudo}> 
            <img src={path + use.picture} alt="user-pic" />
            </NavLink>
            <h4>{use.pseudo}</h4>
            <div className="follow-handler">
          <FollowHandler idToFollow={use._id} type={'suggestion'}/>
               
            </div>
          </li>
        )
        }
    }
    
})}
    </ul>
  </div>
</div>

)}

{ followersPopup && (
<div className='popup-profil-container'>  
<div className='modal'>
  <h3>Abonnée</h3>
    <span className='cross' onClick={() => setFollowersPopup(false)}>&#10005;
    </span>
    <ul>
         
{usersData.map((use) => {

for (let i = 0; i < user.followers.length; i++) {
    if (use._id === user.followers[i]) {

        return (
            <li key={use._id}>
             <NavLink to={chemin + use.pseudo}> 
            <img src={path + use.picture} alt="user-pic" />
            </NavLink>
            <h4>{use.pseudo}</h4>
            <div className="follow-handler">
            <h1><FollowHandler idToFollow={use._id} type={'suggestion'}/></h1>
            </div>
          </li>
           )

        }
    }
}
)}
      </ul>
    </div>
</div>

)} 
     </div>
    );
};

export default UpdateProfil;
