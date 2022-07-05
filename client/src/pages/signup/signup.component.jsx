import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './signup.styles.css'
import Loader from "../../components/loader/Loader.component";
import { AuthContext } from "../../context/Auth.context";
import SignupFormContainer from "./signup-form-container/SignupFormContainer.component";

const Signup = () => {

    const navigate = useNavigate();
    const { userToken } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (userToken) {
            navigate('/')
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])

    return isLoading ? (<Loader />) : (

        <div className="signup-page">
            <SignupFormContainer />
        </div >
    )
}

export default Signup;