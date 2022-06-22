import React from 'react';
import { BrowserRouter, Routes, Route, Navigate,  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import NavBar from '../NavBar';
import { useContext, useEffect, useRef, useState } from "react";
import Messenger from '../../pages/Messenger';




const index = ({utilisateure}) => {
 


 
   

    return (
      
     
        <BrowserRouter> 
          <NavBar/>
        <Routes>  
        <Route path='/'  element={<Home/>} />
        <Route path='/profile/:pseudo'  element={<Profil/>}/>
        <Route path='/messenger'  element={  <Messenger utilisateure={utilisateure}/> }/>
        <Route path='/trending'  element={<Trending/>}/>
        <Route path='*'  element={<Home/>} />
        
        </Routes> 
        </BrowserRouter>    
         
      
    );
};

export default index;