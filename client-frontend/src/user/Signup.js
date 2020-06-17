import React, {useState} from 'react'
import AppNavbar from "../AppNavbar";
import { signup } from '../auth/index';
import {Link} from 'react-router-dom';

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const {name, email, password, error, success} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values,error: false})
        signup({name, email,  password})
            .then(data => {
                if(data.error){ 
                    setValues({...values, error:data.error , success: false})
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    });
                }
            })
            .catch(console.log("Error in signup"));
    }

    const signupForm = () => {
        return (
            <div className="container jumbotron bg-white margin-auto">
                {successMessage()}
                {errorMessage()}
                <div className="row">
                <div className='col-md-6 offset-sm-3 text-left'>
                <form className="ui form  raised segment">
                    <div className="form-group">
                        <h1>SignUp</h1>
                        <label for="exampleInputEmail1">Name</label>
                        <input 
                                className="form-control" 
                                onChange={handleChange("name")}     
                                type="text"
                                value={name}
                        />
                    </div>
                    <div className="form-group">
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
                    <button onClick={onSubmit} className="btn btn-dark btn-block">SignUp</button>
                    <p>Already have account..? <Link to="/signin">SignIn</Link></p>
                </form>
                </div>
                </div>
            </div>
        );
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className='col-md-6 offset-sm-3 text-left'>
                    <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                        New account created successfully.Please {" "}<Link to="/signin">Login Here</Link>
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
            <AppNavbar />
            <div>
                {signupForm()}
            </div>
        </div>
    )
}

export default Signup;