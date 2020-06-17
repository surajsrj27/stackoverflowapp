import React, {useState, useEffect} from 'react';
import AppNavbar from "../AppNavbar";
import { getAllProfiles } from '../apicall/index';

const ShowCommunity = () => {

    const [profiles, setProfile] = useState([]);

    const [error, setError] = useState("");

    const preload = () => {
        getAllProfiles().then(data => {
            if(data.profilesenotfound){
                setError({error: data.profilesenotfound})
            } else {
                setProfile(data);
            }
        });
    };

    useEffect(() => {
        preload();
    },[]);

    return (
        <div>
            <AppNavbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-6 ml-4 ui middle aligned divided list">
                        <h2>Community</h2>
                        {profiles.map(profile => {
                            return (
                            <div className="item">
                                <div className="content">
                                    <div className="header"><h3>{profile.user.name}</h3></div>
                                    <div><h4>portfolio: {profile.portfolio}</h4></div>
                                    <div><h4>country: {profile.country}</h4></div>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                    <div className="col-6"></div>
                </div>
            </div>
        </div>
    )
}

export default ShowCommunity;