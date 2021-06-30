import React,{useState,useContext} from "react";
import Axios from "axios";
import {Link,useHistory} from "react-router-dom";
import "../auth/AuthForm.scss";
import {UserContext} from "../../../context/UserContext";
import ErrorMessage from "../ErrorMessage";


function Register(){
    const[formEmail,setFormEmail]=useState("");
    const[userId,setUserId]=useState("");
    const[formPassword,setFormPassword]=useState("");
    const[mobileNo,setMobileNo]=useState("");
    const[first_name,setfirst_name]=useState("");
    const{getUser}=useContext(UserContext);
    const history=useHistory();
    const [errorMessage,setErrorMessage]=useState(null);

    function setTheUserId(response){
        setUserId(response.data.data.insertId);
        history.push("/login");

    }

    async function register(e){
        e.preventDefault();
        const registerData={
            email:formEmail,
            password:formPassword,
            number:mobileNo,
            first_name:first_name
        }
        try{
            await Axios.post("http://localhost:3040/user/",registerData)
            .then(response=>setTheUserId(response));

        }catch(err){
            console.log(err);
            if(err.response){
                if(err.response.data.errorMessage){
                    setErrorMessage(err.response.data.errorMessage);
                    console.log("go here"+errorMessage);
                }
            }
        }
        if(errorMessage==null){
            //await getUser();
            history.push("/");
        }
       

        //If we dont set httpflag as true in the server we can get the flag details in the browser
        //console.log(document.cookie);

    }


    return(
            <div className="auth-form">
                <h2>Register a new account</h2>
                {
                  errorMessage&&<ErrorMessage message={errorMessage} clear={()=>setErrorMessage(null)}/>
                }
                <form className="form" onSubmit={register}>
                <label htmlFor="first-name">Name</label>
                    <input
                        id="first-name" 
                        type="text" 
                        value={first_name} 
                        onChange={(e)=>setfirst_name(e.target.value)}
                    />
                    <label htmlFor="form-email">Email</label>
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
                    <label htmlFor="Phoneno">Mobile No</label>
                    <input
                        id="Phoneno" 
                        type="text" 
                        value={mobileNo} 
                        onChange={(e)=>setMobileNo(e.target.value)}
                    />
                    <button className="btn-submit" type="submit">
                        Register
                    </button>
                </form>
                <p>Already have an account? <Link to="/login">Login Instead</Link></p>
                

    
            </div>
    );
    };

export default Register;