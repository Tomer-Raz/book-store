import React, { useState, useEffect } from "react";
import './notFound.styles.css'
import Loader from "../../components/loader/loader.component";

const NotFound = () => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])

    return isLoading ? (<Loader />) : (

        <div className="error-page">
            <div className="error-container">
                <img id="error-img" src="https://www.artzstudio.com/content/images/wordpress/2020/05/404-error-not-found-page-lost.png"></img>
                <div className="text-and-button">
                    <h3 id="error-text">Whoops, can't find this page.</h3>
                    <a href="/">
                        <button type="button" id="error-button">Home</button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default NotFound