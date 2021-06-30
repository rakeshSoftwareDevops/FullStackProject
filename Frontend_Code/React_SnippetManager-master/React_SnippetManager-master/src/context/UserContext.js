import React,{createContext, useEffect, useState} from "react";
import Axios from 'axios';


export const UserContext=createContext({});

/**function UserContextProvider(props){
    const[user,setUser]=useState(undefined);

    function setUserData(userResponse){
        setUser(userResponse);
       // console.log("go here");
    }
    function showdata(){
        console.log(user);
    }
  /*8  async function getUser(){
        const userRes=await Axios.get("http://localhost:5000/auth/loggedIn");
        setUser(userRes.data);
        console.log("userdata"+userRes.data);
        //setUser("Hello");
    }

    useEffect(()=>{
        getUser();

    },[]);
    return( 
           <UserContext.Provider value={{/**user}}>
               {props.children}
            </UserContext.Provider>
          );

};*/
//export default UserContext;
//export {UserContextProvider};