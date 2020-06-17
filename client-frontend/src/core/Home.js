import React from 'react'
import AppNavbar from "../AppNavbar";
import ShowAllQuestions from "./ShowAllQuestions";

const Home = () => {
    return (
        <div>
            <AppNavbar />
            <div className="container mt-5">
                <ShowAllQuestions />
            </div>
        </div>
    )
}

export default Home;