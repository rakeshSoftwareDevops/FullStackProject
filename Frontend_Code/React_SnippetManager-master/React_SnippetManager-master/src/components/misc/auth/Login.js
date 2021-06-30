import React,{useContext, useState} from "react";
import Axios from "axios";
import {Link,useHistory} from "react-router-dom";
import "../auth/AuthForm.scss";
import ErrorMessage from "../ErrorMessage";
import {UserContext} from "../../../context/UserContext";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

function Login(){
    const[formEmail,setFormEmail]=useState("");
    const[formPassword,setFormPassword]=useState("");
    const {setUserToken}=useContext(UserContext);
    const {setUserId}=useContext(UserContext);
    const {userToken}=useContext(UserContext);
    const history=useHistory();
    const [errorMessage,setErrorMessage]=useState(null);
    const [loggedInFlag,setLoggedInFlag]=useState(false);

    
    function saveTheResponse(data){
        console.log(data);
        if(data.data.token){
            history.push("/home");
            setLoggedInFlag(true);

        }
        setUserToken(data.data.token);
        setUserId(data.data.user_id);
    }
    
    async function login(e){
        e.preventDefault();
        const loginData={  
            email:formEmail,
            password:formPassword,
        }
        try{
            await Axios.post("http://localhost:3108/user/login",loginData)
            .then(response=>saveTheResponse(response));

        }catch(err){
            if(err.response){
                if(err.response.data.errorMessage){
                    setErrorMessage(err.response.data.errorMessage);
                    console.log("error variable"+errorMessage);
                }
            }
        }
        if(errorMessage==null){
            if(loggedInFlag==true){
                history.push("/home");
            }
           /** UserContextProvider(tokenData);*/            
        }
       
       

        //If we dont set httpflag as true in the server we can get the flag details in the browser
        //console.log(document.cookie);

    }


    return(
            <div className="auth-form">
                <h2>Log in</h2>
                {
                  errorMessage&&<ErrorMessage message={errorMessage} clear={()=>setErrorMessage(null)}/>
                }
                <form className="form"onSubmit={login}>
                    <label htmlFor="form-email">Email</label>
                    <TextField id="standard-basic" label="emailId" />

                    <input
                        id="form-email" 
                        type="email" 
                        value={formEmail} 
                        onChange={(e)=>setFormEmail(e.target.value)}
                    />
                    <label htmlFor="form-password">Password</label>
                    <input
                        id="form-password" 
                        type="password" 
                        value={formPassword} 
                        onChange={(e)=>setFormPassword(e.target.value)}
                    />
                    <button className="btn-submit" type="submit">
                        Log in
                    </button>
                </form>
                <p>Don't have an account yet? <Link to="/Register">Register Here</Link></p>
                

    
            </div>
    );
    };

export default Login;