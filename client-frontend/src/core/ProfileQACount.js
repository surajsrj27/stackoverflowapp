import React, { useState, useEffect } from "react";
import { getAllQuestions } from '../apicall/index';

const ProfileQACount = ({userId}) => {

    const [count, setCount] = useState({
        error: "",
        questCount: 0,
        ansCount: 0
    });

    const { questCount, ansCount, error } = count;

    useEffect(() => {
        getAllQuestions().then(questions => {
            if(questions.noquestions){
                setCount({...count, error: questions.noquestions})
            } else {
                const tempQuest = questions.filter(question => question.user === userId);

                let tempCount = 0;
                questions.map(question => {
                    const { answers } = question;
                    const tempAns = answers.filter(answer => answer.user === userId);
                    tempCount = tempCount + tempAns.length;
                });
                setCount({...count, questCount: tempQuest.length, ansCount: tempCount})
            }
        });
    },[]);

    const checkCount = () => {
        if(error){
            return <h1>Please wait.. or refresh the Page!!</h1>
        } else {
          return (
            <div>
                <h3>You have asked ({questCount})Questions</h3>
                <h3>You have answered ({ansCount})Questions</h3>
            </div>
          )
        }
    }

    return (
        <div>
        {checkCount()}
        </div>
    )
}

export default ProfileQACount;