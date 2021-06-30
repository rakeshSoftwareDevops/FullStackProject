import axios from 'axios';
import './App.css';
import {UserContext} from "./context/UserContext";
import Router from './Router'; 
import React, { useEffect,useState,useContext } from 'react';
import "./styles/index.scss";

axios.defaults.withCredentials=true;
function App() {
  const [userToken,setUserToken]=useState('');
  const [userId,setUserId]=useState('');
  console.log("tokenvalue"+userToken);
  console.log(userId);
  return (
    <UserContext.Provider value={{userToken,setUserToken,userId,setUserId}}>
        <div className='container'>
          <Router/>
        </div>
    </UserContext.Provider>
    
  );
}

export default App;
