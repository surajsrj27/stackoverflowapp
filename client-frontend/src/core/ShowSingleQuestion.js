import React, { useState, useEffect } from "react";
import AppNavbar from "../AppNavbar";
import { getAQuestion, upvoting } from "../apicall/index";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ShowSingleQuestion = ({ match }) =>{

    const {  user , token } = isAuthenticated();

    const [question, setQuestion] = useState({
        name:"",
        textone:"",
        texttwo:"",
        upvotes:[],
        answers:[]
    });

    const [status, setStatus] = useState({
        error: false,
        success: false
    });

    const { name, textone, texttwo, upvotes, answers} = question;
    const { error, success} = status;

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
    }, {});

    const onVoting = event => { 
        upvoting(user._id, token, match.params.questionId)
            .then(data => {
                if(data.error){
                    setStatus({...status, error:data.error , success: false})
                } else {
                    setQuestion(data);
                    setStatus({...status,  success: true})
                }
            });
    }
    
    const voteAlert = () => toast("You have already voted!", {type: "error"});

    const checkVotes = (upvotes) => {
        const temp = upvotes.filter(voter => voter.user === user._id);
        if(temp.length > 0){
            return (
                <div>
                    <div className="ui labeled button" tabindex="0">
                        <div onClick={voteAlert} className="ui button">
                            <i className="heart icon"></i> Like
                        </div>
                        <a className="ui basic label">
                            {upvotes.length}
                        </a>
                    </div>
                    <ToastContainer />
                </div>
            )
        } else {
            return (
                <div className="ui labeled button" tabindex="0">
                    <div onClick={onVoting} className="ui button">
                        <i className="heart icon"></i> Like
                    </div>
                    <a className="ui basic label">
                        {upvotes.length}
                    </a>
                </div>
            )
        }
    }

    const showAnswer = (answers) => {
        if(answers.length > 0){
            if(answers.length === 1){
                return (
                    <div className="row">
                        <div className="col-lg-9 col-sm-12">
                            <h3>{answers.length} Answer</h3>
                            {answers &&
                                answers.map(answer => (
                                    <div className="ui vertical segment" key={answer._id}>
                                        {answer.text}
                                    </div>
                            ))}
                        </div>
                        <div className="col-lg-3"></div>
                    </div>   
                )
            } else {
                return (
                    <div className="row">
                        <div className="col-lg-9 col-sm-12">
                            <h3>{answers.length} Answers</h3>
                            {answers &&
                                answers.map(answer => (
                                    <div className="ui vertical segment" key={answer._id}>
                                        {answer.text}
                                    </div>
                            ))}
                        </div>
                        <div className="col-lg-3"></div>
                    </div>    
                )
            }
        } else {
            return <h3>Know someone who can answer? Share a link to this question via <Link to="#">email</Link>, <Link to="#">Twitter</Link>, or <Link to="#">Facebook</Link>.</h3>;
        }
    }

    return (
        <div>
            <AppNavbar />
            <div className="container mt-5">
                <div>{checkVotes(upvotes)}</div>

                <div className="row mt-3">
                    <div className="col-8 col-sm-8 col-md-9 col-lg-9 col-xl-9"><h2>{name}</h2></div>
                    <div className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3" style={{textAlign:"right"}}>
                        <Link to="/askquestion" className="ui button primary">Ask Question</Link>
                    </div>
                </div>

                <div className="ui divider"></div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 col-sm-12 ui raised segment" style={{backgroundColor: '#DAE0E2'}}>
                            <div>{textone}</div>
                            <div>{texttwo}</div>
                        </div>
                        <div className="col-lg-3"></div>
                    </div> 
 
                    <div>{showAnswer(answers)}</div>
                        
                    <Link to={`/answerquest/${match.params.questionId}`} className="ui button primary mt-3">Post Your Answer</Link>
                </div>
            </div>
        </div>
    )
};

export default ShowSingleQuestion; 


