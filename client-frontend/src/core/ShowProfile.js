import React, { useState, useEffect } from "react";
import AppNavbar from "../AppNavbar";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { getProfile, getAllQuestions } from '../apicall/index';
import ProfileQACount from './ProfileQACount';

const ShowProfile = () => {

    const { user, token } = isAuthenticated();

    const [profile, setProfile] = useState({
        username: "",
        website: "",
        country: "",
        portfolio: "",
        social: "",
        languages: [],
        error: "",
        success: false
    });

    const { username, website, country, portfolio, social: { youtube, facebook, instagram}, languages, error, success} = profile;

    const preload = (userId, token) => {
        getProfile(userId, token).then(data => {
            if(data.profilenotfound){
                setProfile({...profile, error: data.profilenotfound , success: false})
            } else {
                setProfile({
                    ...profile,
                    username: data.username,
                    website: data.website,
                    country: data.country,
                    portfolio: data.portfolio,
                    social: data.social,
                    languages: data.languages,
                    success: true})
            }
        });
    };

    useEffect(() => {
        preload(user._id, token);
    },[]);

    const checkProfile = () => {
        if(success){
            return (
                <div className="row mb-3">
                    <div className="col-8 col-sm-8 col-md-6 col-lg-6 col-xl-6">
                        <table className="ui celled striped table">
                            <thead>
                                <tr><th colspan="3">
                                <h1>{username}</h1>
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Website</td>
                                    <td>{website}</td>
                                </tr>
                                <tr>
                                    <td>Country</td>
                                    <td>{country}</td>
                                </tr>
                                <tr>
                                    <td>Portfolio</td>
                                    <td>{portfolio}</td>
                                </tr>
                                <tr>
                                    <td>Languages</td>
                                    <td>{languages &&
                                        languages.map(language => (
                                            <p className="ui label">{language}</p>
                                    ))}</td>
                                </tr>
                                <tr>
                                    <td>Youtube</td>
                                    <td>{youtube}</td>
                                </tr>
                                <tr>
                                    <td>Facebook</td>
                                    <td>{facebook}</td>
                                </tr>
                                <tr>
                                    <td>Instagram</td>
                                    <td>{instagram}</td>
                                </tr>
                            </tbody>    
                        </table>
                    </div>
                    <div className="col-4 col-sm-4 col-md-6 col-lg-6 col-xl-6">
                        <ProfileQACount userId={user._id} />
                    </div>
                </div>
            );
        } else {
           return (
               <div>
                    <div className="row mt-3">
                        <div className="col-9"><h2 className="my-3 mx-3">{errorMessage()}</h2></div>
                        <div className="col-3">
                            <Link to="/saveprofile" className="ui button primary  my-3 mx-3">Click here</Link>
                        </div>
                    </div>
               </div>
           )
        }
    }

    const errorMessage = (username) => {
        if(error){
            return ( 
                <div className="row">
                    <div className='col-md-6 offset-sm-3 text-center'>  
                        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                            <h4>Please create your profile</h4>  
                        </div>
                    </div>
                </div>
               );
        }   
     };

    return (
        <div>
            <AppNavbar />
            <div className="container mt-5">
                {checkProfile()}
                
            </div>
            
        </div>
    )
}

export default ShowProfile;