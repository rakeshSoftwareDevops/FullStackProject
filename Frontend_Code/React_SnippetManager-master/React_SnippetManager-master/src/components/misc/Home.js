import React, { useEffect,useState,useContext } from 'react';
import {Link} from "react-router-dom";
import Axios from 'axios';
import Snippet from './Snippet';
import SnippetEditor from './SnippetEditor';
import './Home.scss';
import {UserContext} from "../../context/UserContext";

function Home(){
    const [snippets,setSnippets]=useState([]);
    const [newsnippeteditoropen,setsnippetFlag]=useState(false);
    const [editsnippetFlag,setEditSnippetFlag]=useState(false);
    const [editsnippetData,setEditSnippetData]=useState([]);
    const {userToken}=useContext(UserContext);
    const {userId}=useContext(UserContext);
    const {user}=useContext(UserContext);
    console.log(userToken);
    useEffect(()=>{
        console.log(userId);
        console.log(editsnippetFlag)
        if(!userId){
            setSnippets([]);
            return;
        } 
        getsnippets();
        
    },[userId]);
    
    function reseteditoropenflag(){
        if(newsnippeteditoropen){
            setsnippetFlag(false);
        }
       
    }
    function editSnippets(snippetsData){
        if(!newsnippeteditoropen){
            setsnippetFlag(true);
        }
        setEditSnippetFlag(true);
        //console.log("go here"+snippetsData);
        setEditSnippetData(snippetsData);

    }
    async function getsnippets(){
        const user_Data={
           "user_id": userId
        }
        const token=userToken;
        console.log(token);
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const snippetResponse=await Axios.post("http://localhost:3108/user/get-snippets",
        user_Data
        ).then(response=>setSnippets(response.data)).catch(console.log);
        //setSnippets(snippetResponse.data);
    }
    
    function rendersnippets(){
       let sortedSnippets=[...snippets];
       sortedSnippets=sortedSnippets.sort((a,b)=>{
           return new Date(b.updatedAt)-new Date(a.updatedAt);
       }
       )

       return snippets.map((snippet,i)=>{
           return <Snippet 
           key={i} 
           getsnippets={getsnippets}
           editsnippets={editSnippets} 
           snippets={snippet}/>

       });
    }

    return(
        <div className="home">
            {!newsnippeteditoropen && (<button className="btn-editor-toggle" onClick={()=>setsnippetFlag(true)}>
                Add Snippet
            </button>
            )}
            {newsnippeteditoropen && (
                <SnippetEditor 
                    setnewsnippeteditoropen={newsnippeteditoropen} 
                    getsnippets={getsnippets}
                    reseteditoropenflag={reseteditoropenflag}
                    editsnippetFlag={editsnippetFlag}
                    editsnippetData={editsnippetData}
                />
            )
            }
            {snippets.length>0 ?( rendersnippets()):userToken && (<p className="no-snippets-msg">No Snippets have been added yet</p>)}
            {userToken &&(
                    <div className="no-user-message">
                     <h2>Welcome to Snippet Manager</h2>
                     <Link to="/register">Register here</Link>
                    </div>
                )
            }
        </div>
    )
}

export default Home;