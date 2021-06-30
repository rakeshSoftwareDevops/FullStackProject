import React, { useState,useEffect,useContext } from 'react';
import Axios from 'axios';
import "./SnippetEditor.scss";
import ErrorMessage from "./ErrorMessage";
import {UserContext} from "../../context/UserContext";


function SnippetEditor(props){

    const [editorTitle,setEditorTitle]=useState('');
    const [editorDescription,setEditorDescription]=useState('');
    const [editorCode,setEditorCode]=useState('');
    const [errorMessage,setErrorMessage]=useState(null);
    const {userToken}=useContext(UserContext);
    const {userId}=useContext(UserContext);

    useEffect(()=>{

        if(props.editsnippetFlag){
          console.log(props.editsnippetData._id);  
          setEditorTitle(props.editsnippetData.title);
          setEditorDescription(props.editsnippetData.description);
          setEditorCode(props.editsnippetData.code);
        }
        console.log(userToken);

    },[props.editsnippetFlag, props.editsnippetData._id, props.editsnippetData.title, props.editsnippetData.description, props.editsnippetData.code]);
    async function submitDataToBackend(e){
        e.preventDefault();
        const token=userToken;
        console.log(token);
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        const snippetData={
            title:editorTitle?editorTitle:undefined,
            description:editorDescription?editorDescription:undefined,
            code:editorCode?editorCode:undefined,
            user_id:userId
        };
        try{
            if(props.editsnippetFlag){
                await Axios.put(`http://localhost:5000/snippet/${props.editsnippetData._id}`,snippetData);
    
            }
            else{
                await Axios.post("http://localhost:3108/user/insert-snippets",
                snippetData,
                config
                ).then(console.log).catch(console.log);
    
            }
        }catch(err){
            if(err.response){
                if(err.response.data.errorMessage){
                    setErrorMessage(err.response.data.errorMessage);
                }
            }
        }
        if(errorMessage==null)
        {
            props.getsnippets();
            closeEditor();
        }
        
    }

    
    function closeEditor(){
        setEditorTitle("");
        setEditorDescription("");
        setEditorCode("");
        props.reseteditoropenflag();

    }
    return(
        <div className="snippet-Editor">
                {
                  errorMessage&&<ErrorMessage message={errorMessage} clear={()=>setErrorMessage(null)}/>
                }
      
                {props.setnewsnippeteditoropen && <div className="snippet-editor">
                    <form className="form" onSubmit={submitDataToBackend}>
                        <label htmlFor="editor-title">Title</label>
                        <input id="editor-title" value={editorTitle} type="text" onChange={(e)=>setEditorTitle(e.target.value)}/>
                        <label htmlFor="editor-description">Description</label>
                        <input id="editor-description" value={editorDescription}  type="text" onChange={(e)=>setEditorDescription(e.target.value)}/>
                        <label htmlFor="editor-code">Code</label>
                        <textarea id="editor-code" 
                        value={editorCode} 
                        onChange={(e)=>setEditorCode(e.target.value)}/>
                        <button className="btn-save" type="submit">Save</button>
                        <button className="btn-cancel" onClick={closeEditor}>Cancel</button>
                    </form>
                                
                    </div>
                }
        </div>
    );
};

export default SnippetEditor;