import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getAllQuestions } from '../apicall/index';

const ShowAllQuestions = () => {

    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState("");

    const preload = () => {
        getAllQuestions().then(data => {
            if(data.noquestions){
                setError({error: data.noquestions})
            } else {
                setQuestions(data);
            }
        });
    };

    useEffect(() => {
        preload();
    },[]);
      
    const checkErrors = (error) => {
        if(error){
            return <h1>Please wait... or refresh the Page!!</h1>;
        } else {
          return (
            <div style={{textAlign:"left"}}>
                    <div className="row">
                        <div className="col"><h2>All Questions</h2></div>
                        <div className="col" style={{textAlign:"right"}}>
                            <Link to="/askquestion" className="ui button primary">Ask Question</Link>
                        </div>
                    </div>
                    <div className="ui relaxed divided list">
                        { questions.map(question => {
                            return(
                                <div className="container item" key={question._id}>
                                <div className="row">
                                    <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="row">
                                                    <div className="col-12" style={{color: '#99AAAB', textAlign: 'center'}}>{question.upvotes.length}</div>
                                                    <div className="col-12" style={{color: '#99AAAB', textAlign: 'center'}}>votes</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="row">
                                                    <div className="col-12" style={{color: '#99AAAB', textAlign: 'center'}}>{question.answers.length}</div>
                                                    <div className="col-12" style={{color: '#99AAAB', textAlign: 'center'}}>answers</div>                                    
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                    <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                        <Link to={`/singlequest/${question._id}`} style={{ color: '#3CA3EA' }}><h2 className="font-weight-light">{question.name}</h2></Link>
                                    </div>
                                </div>
                                </div>
                            );
                        })}
                    </div>
            </div>
          )
        }
    }

    return (
        <div>
        {checkErrors(error)}
        </div>
    )
};

export default ShowAllQuestions; 

