import React, { useContext } from 'react';
import Log from '../components/Log';
import { UidContext } from '../components/AppContext';
import UpdateProfil from '../components/Profil/UpdateProfil';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const Profil = () => {
    const uid = useContext(UidContext);
     const [user, setUser] = useState({})

     const pseudo = useParams().pseudo;
 


     
     useEffect(() => {
    
      const fetchUser = async ()=> {

        const res =  await axios.get(`${process.env.REACT_APP_API_URL}api/user?pseudo=${pseudo}`)

    setUser(res.data)
  
         
      };


      fetchUser();
        

  
     }, [pseudo])

    
    
    return (
      <div className="profil-page">
      {uid ? (
        <UpdateProfil user={user}/>
        
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
       
          <div className="img-container">
            <img src="/img/log.svg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  );
};
   
  export default Profil;