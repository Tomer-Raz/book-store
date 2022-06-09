import React, { useState, useEffect } from "react";
import './homePage.styles.css'
import Card from "../../components/book-card/card.component";
import Loader from "../../components/loader/loader.component";

const HomePage = () => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])

    return isLoading ? (<Loader />) : (
        <div className="homepage-container">
            <div className="titles">
                <h1 id="head-title">Welcome to the home page!</h1>
                <h2 id="secondary-title">Take a look at our books</h2>
                <Card />
            </div>
        </div>
    )
}

export default HomePage;