import React, { useState, useEffect } from 'react';
import AppNavbar from "../AppNavbar";
import { getAQuestion, answerAQuestion } from '../apicall/index';
import { isAuthenticated } from '../auth/index';
import { Redirect } from "react-router-dom";

const AnswerQuestion = ({ match }) => {

    const {  user , token } = isAuthenticated(); 
    
    const [question, setQuestion] = useState({
        name: "",
        textone:"",
        texttwo:""
    });

    const [answer, setAnswer] = useState({
        name:"",
        text:"",
        error: "",
        redirect: false
    });

    const { textone, texttwo } = question;

    const { name, text, error, redirect } = answer;

    const preload = (questionId) => {
        getAQuestion(questionId).then(data => {
            if(data.error){
                console.log(data.error);
            } else {
                setQuestion(data);
            }
        });
    };

    useEffect(() => {
        preload(match.params.questionId);
    }, []);

    const handleChange = name => event => {
        setAnswer({...answer, error: false, [name]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        setAnswer({...answer,error: false})

        answerAQuestion(user._id, match.params.questionId, token , {name, text,})
            .then(data => {
                if(data.error){ 
                    setAnswer({...answer, error:data.error })
                } else {
                    setAnswer({
                        ...answer,
                        name:"",
                        text:"",
                        error: "",
                        redirect: true
                    });
                }
            })
            .catch(console.log("Problem Submitting Answer"));
    }

    const getARedirect = redirect => {
        if (redirect) {
          return <Redirect to={{pathname: `/singlequest/${match.params.questionId}`}}/>;        
        }
    };

    const answerForm = () =>{
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-9 col-sm-12 ui secondary raised segment">
                        <form className="ui form">
                            <div className="form-group">
                                <label for="exampleFormControlInput1">Name</label>
                                <input 
                                            className="form-control" 
                                            onChange={handleChange("name")}     
                                            type="text"
                                            value={name}
                                />
                            </div>
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1">Your Answer</label>
                                <textarea 
                                    className="form-control" 
                                    rows="10"
                                    onChange={handleChange("text")}
                                    type="textarea"
                                    value={text}
                                    ></textarea>
                            </div>
                            <button type="submit" onClick={onSubmit} className="ui button primary">Post Your Answer</button>
                        </form>
                    </div>
                    <div className="col-lg-3"></div>
                </div>        
            </div>
        );
    }

    return (
        <div>
            <AppNavbar/>
            <div className="container mt-5">
                <h1>{question.name} ?</h1>
                {answerForm()}
                {getARedirect(redirect)}
            </div>
        </div>
    )
}

export default AnswerQuestion;
