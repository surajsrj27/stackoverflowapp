import React, { useState, useEffect } from 'react';
import AppNavbar from "../AppNavbar";
import { askQuestion } from '../apicall/index';
import { Redirect } from "react-router-dom";
import { isAuthenticated } from '../auth/index';

const AskQuestion = () => {

    const {  user , token } = isAuthenticated();

    console.log(user._id);
    console.log(token);

    const [values, setValues] = useState({
        name: "",
        textone: "",
        texttwo: "",
        error: "",
        success: false,
        redirect: false
    });

    const {name, textone, texttwo, error, success, redirect} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false})

        askQuestion(user._id, token, {name, textone, texttwo})
            .then(data => {
                if(data.error){ 
                    setValues({...values, error:data.error , success: false})
                } else {
                    setValues({
                        ...values,
                        name: "",
                        textone: "",
                        texttwo: "",
                        error: "",
                        success: true,
                        redirect: true
                    });
                }
            })
            .catch(console.log("Problem in submitting question"));
    }

    const getARedirect = redirect => {
        if (redirect) {
          return <Redirect to="/" />;        
        }
    };

    const questionForm = () =>{
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-9 col-sm-12 ui secondary raised segment">
                        <form className="ui form">
                            <div className="form-group">
                                <label for="exampleFormControlInput1">Title</label>
                                <input 
                                            className="form-control" 
                                            onChange={handleChange("name")}     
                                            type="text"
                                            value={name}
                                />
                            </div>
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1">Body</label>
                                <textarea 
                                    className="form-control" 
                                    rows="10"
                                    onChange={handleChange("textone")}
                                    type="textarea"
                                    value={textone}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label for="exampleFormControlInput1">Description</label>
                                <textarea 
                                            className="form-control" 
                                            rows="3"
                                            onChange={handleChange("texttwo")}     
                                            type="textarea"
                                            value={texttwo}
                                ></textarea>
                            </div>
                            <button type="submit" onClick={onSubmit} className="ui button primary" className="ui button primary">Post Your Question</button>
                        </form>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>
        );
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className='col-md-6 offset-sm-3 text-left'>
                    <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                        Question submitted Successfully
                    </div>
                </div>
            </div>
        );
    };

    const errorMessage = () => {
        return ( 
         <div className="row">
             <div className='col-md-6 offset-sm-3 text-left'>  
                 <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                     {error}   
                 </div>
             </div>
         </div>
        );
     };

    return (
        <div>
            <AppNavbar/>
            <div className="container mt-5">
                <h1>Ask a public question</h1>
                
                {successMessage()}
                {errorMessage()}
                {questionForm()}
                {getARedirect(redirect)}
            </div>
        </div>
    )
}

export default AskQuestion; 
