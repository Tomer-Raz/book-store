import React from "react";
import './home.styles.css'
import CardContainer from "./card-container/CardContainer.component";

const Home = () => {
    return (
        <div className="homepage-container">
            <div className="titles">
                <h1 id="head-title">Welcome to the home page!</h1>
                <h2 id="secondary-title">Take a look at our books</h2>
                <CardContainer />
            </div>
        </div>
    )
}

export default Home;