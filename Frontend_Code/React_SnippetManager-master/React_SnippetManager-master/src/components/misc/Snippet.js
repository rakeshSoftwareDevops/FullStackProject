import React from "react";
import Axios from 'axios';
import "./snippet.scss";

function Snippet(props){

    console.log(props.snippets);

async function editSnippets(e){
    if(!props.setnewsnippeteditoropen){
        props.editsnippets(props.snippets);
    }
}
async function deleteSnippets(e){
    const snippetId=e.target.value;
    console.log(snippetId);

    if(window.confirm("Do you want to delete this snippet?")){
        await Axios.delete(`http://localhost:5000/snippet/${props.snippets._id}`);
 
        props.getsnippets();

    }
  /**await fetch("http://localhost:5000/snippet/"+snippetId,{
        method:'DELETE',
        header:{'Accept':'application/json',
        'content-Type':'application/json'
        
        }
    });*/
}
 
 return(
    <div className="snippet">
        <p>
          some more atext<a href="/">Test link</a>
        </p>
        {props.snippets.title&&<h1 className='title'>{props.snippets.title}</h1>} 
        {props.snippets.description&&<p className='description'>{props.snippets.description}</p>} 
        {props.snippets.code&&(
        <pre className='code'>
            <code>
                {props.snippets.code}
            </code>
        </pre>
            
        )}
        <button className='btn-edit' value={props.snippets._id} onClick={editSnippets}>Edit</button>
        <button className='btn-delete' value={props.snippets._id} onClick={deleteSnippets}>Delete</button>
    </div>
    );
};

export default Snippet;


