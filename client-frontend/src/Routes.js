import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoutes from './auth/PrivateRoutes';
import ShowSingleQuestion from './core/ShowSingleQuestion';
import AnswerQuestion from './core/AnswerQuestion';
import AskQuestion from './core/AskQuestion';
import ShowProfile from './core/ShowProfile';
import ShowCommunity from './core/ShowCommunity';
import SaveProfile from './core/SaveProfile';

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/community" exact component={ShowCommunity} />
                    <PrivateRoutes path="/singlequest/:questionId" exact component={ShowSingleQuestion} />
                    <PrivateRoutes path="/answerquest/:questionId" exact component={AnswerQuestion} />
                    <PrivateRoutes path="/askquestion" exact component={AskQuestion} />
                    <PrivateRoutes path="/profile" exact component={ShowProfile} />
                    <PrivateRoutes path="/saveprofile" exact component={SaveProfile} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default Routes;