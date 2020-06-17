import React, {useState} from 'react'
import AppNavbar from "../AppNavbar";
import {Link, Redirect} from 'react-router-dom';

import { signin, authenticate, isAuthenticated} from "../auth/index";

const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    });

    const {email, password, error, loading, didRedirect} = values;

    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false, loading: true})
        signin({email, password})
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, loading: false})
                } else {
                    authenticate(data, () => {
                        setValues({...values, didRedirect: true})
                    })
                }
            })
            .catch(console.log("signin request failed"));
    }

    const performedRedirect = () => {
        if(isAuthenticated()){
            return <Redirect to="/" />;
        }
    };

    const signinForm = () => {
        return (
            <div className="container jumbotron bg-white margin-auto">
            {loadingMessage()}
            {errorMessage()}
            <div className="row">
            <div className='col-md-6 offset-sm-3 text-left'>
                <form className="ui form raised segment">
                    <div className="form-group">
                        <h1>SignIn</h1>
                        <label for="exampleInputEmail1">Email</label>
                        <input 
                                className="form-control" 
                                onChange={handleChange("email")}     
                                type="email"
                                value={email}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input 
                                className="form-control" 
                                onChange={handleChange("password")}     
                                type="password"
                                value={password}
                        />
                    </div>
                    <button onClick={onSubmit} className="btn btn-dark btn-block">SignIn</button>
                    <p>Don't have account..? <Link to="/signup">SignUp</Link></p>
                </form>
                </div>
                </div>
            </div>
        );
    }

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
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
            <AppNavbar />
            <div>
                {signinForm()} 
                {performedRedirect()}
            </div>
        </div>
    )
}

export default Signin; 