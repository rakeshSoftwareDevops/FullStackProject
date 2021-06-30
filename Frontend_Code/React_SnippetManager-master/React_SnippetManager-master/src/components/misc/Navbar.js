import React, { useContext } from "react";
import {Link} from "react-router-dom";
import Axios from "axios";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../context/UserContext";
import Home from "./Home"

import "./Navbar.scss"

function Navbar(){
   const {user,getUser}=useContext(UserContext);
   const {userToken}=useContext(UserContext);
   const {userId}=useContext(UserContext);
   const {setUserToken}=useContext(UserContext);
   const {setUserId}=useContext(UserContext);
   const history=useHistory();

   function logout(){
    console.log("here");
    setUserToken('');
    setUserId('');
    history.push("\login");
       
   }

   return(
       <div className="navbar">
           <Link to='/'>
               <h1>Snippet Manager</h1>
           </Link>
           {userToken=='' ?(
               <>
                <Link to='/login'>Log in</Link>
                <Link to='/Register'>Register</Link>
               </>

           ):(
            userToken && <button className="btn-logout" onClick={logout}>
                   Log out
                   </button> 
            ) }

           
        
       </div>
   );
}

export default Navbar;