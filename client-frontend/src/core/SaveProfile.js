import React, { useState, useEffect } from "react";
import AppNavbar from "../AppNavbar";
import { saveProfile } from '../apicall/index';
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/index";

const SaveProfile = () => {

    const {  user , token } = isAuthenticated();

    const [values, setValues] = useState({
        username: "",
        website: "",
        country: "",
        languages: "",
        portfolio: "",
        social: "",
        youtube: "",
        facebook: "",
        instagram: "",
        error: "",
        success: false,
        redirect: false
    });

    const {username, website, country, languages, portfolio, youtube, facebook, instagram, error, success, redirect} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value });
    }

    const onSubmit = event => { 
        event.preventDefault();
        setValues({...values, error: false})

        saveProfile(user._id, token, {username, website, country, languages, portfolio, youtube, facebook, instagram})
            .then(data => {
                if(data.error){ 
                    setValues({...values, error:data.error , success: false})
                } else {
                    setValues({
                        ...values,
                        username: "",
                        website: "",
                        country: "",
                        languages: "",
                        portfolio: "",
                        social: "",
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
          return <Redirect to="/profile" />;        
        }
    };

    const profileForm = () =>{
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-9 col-sm-12 ui secondary raised segment">
                        <form className="ui form">
                            <h2>Create Profile</h2>
                            <div className="form-group">
                                <label>username</label>
                                <input 
                                            className="form-control" 
                                            onChange={handleChange("username")}     
                                            type="text"
                                            value={username}
                                />
                            </div>
                            <div className="form-group">
                                <label>website</label>
                                <input 
                                            className="form-control" 
                                            onChange={handleChange("website")}     
                                            type="text"
                                            value={website}
                                />
                            </div>
                            <div className="form-group">
                                <label>country</label>
                                <input 
                                            className="form-control" 
                                            onChange={handleChange("country")}     
                                            type="text"
                                            value={country}
                                />
                            </div>
                            <div className="form-group">
                                <label>languages</label>
                                <input 
                                            className="form-control" 
                                            onChange={handleChange("languages")}     
                                            type="text"
                                            value={languages}
                                />
                            </div>
                            <div className="form-group">
                                <label>portfolio</label>
                                <input 
                                            className="form-control" 
                                            onChange={handleChange("portfolio")}     
                                            type="text"
                                            value={portfolio}
                                />
                            </div>
                            <div className="form-group">
                                <label>youtube</label>
                                <input 
                                            className="form-control" 
                                            onChange={handleChange("youtube")}     
                                            type="text"
                                            value={youtube}
                                />
                            </div>
                            <div className="form-group">
                                <label>facebook</label>
                                <input 
                                            className="form-control" 
                                            onChange={handleChange("facebook")}     
                                            type="text"
                                            value={facebook}
                                />
                            </div>
                            <div className="form-group">
                                <label>instagram</label>
                                <input 
                                            className="form-control" 
                                            onChange={handleChange("instagram")}     
                                            type="text"
                                            value={instagram}
                                />
                            </div>
                           
                            <button type="submit" onClick={onSubmit} className="ui button primary" className="ui button primary">Save Profile</button>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <AppNavbar />
            <div className="container mt-5">
            {profileForm()}
            {getARedirect(redirect)}
            </div>
        </div>
    )
}

export default SaveProfile;
