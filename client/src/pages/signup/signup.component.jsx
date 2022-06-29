import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import './signup.styles.css'
import Loader from "../../components/loader/Loader.component";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import environments from "../../environments/environments";
import { AuthContext } from "../../context/Auth.context";
import SignupFormContainer from "./signup-form-container/SignupFormContainer.component";

const Signup = () => {

    const API_URL = environments.API_URL;
    const navigate = useNavigate();
    const authConextValue = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(true)

    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmedPasswordShown, setConfirmedPasswordShown] = useState(false);

    const [whichLogo, setLogo] = useState(true)
    const [whichLogoConfirmed, setLogoConfirmed] = useState(true)

    const eye1 = <FontAwesomeIcon icon={faEye} style={{ color: "gray" }} />
    const eye2 = <FontAwesomeIcon icon={faEyeSlash} style={{ color: "gray" }} />

    const handleSignup = async (data) => {
        try {
            const response = await fetch(`${API_URL}/users/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (response.status !== 201) {
                throw new Error();
            }

            const responseData = await response.json();
            const token = responseData.data.token;

            localStorage.setItem('user-token', token);
            authConextValue.setUserToken(token);

            navigate('/');

        } catch (err) {
            alert('Something went wrong')
        }
    }

    const toggleVisibility = () => {
        setPasswordShown(!passwordShown);
        setLogo(!whichLogo)
    };

    const toggleVisibilityConfirmed = () => {
        setConfirmedPasswordShown(!confirmedPasswordShown);
        setLogoConfirmed(!whichLogoConfirmed)
    };

    useEffect(() => {
        if (authConextValue.userToken) {
            navigate('/')
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])

    return isLoading ? (<Loader />) : (

        <div className="signup-page">
            <SignupFormContainer
                handleSignup={handleSignup}
                toggleVisibility={toggleVisibility}
                toggleVisibilityConfirmed={toggleVisibilityConfirmed}
                eye1={eye1}
                eye2={eye2}
                whichLogo={whichLogo}
                whichLogoConfirmed={whichLogoConfirmed}
                passwordShown={passwordShown}
                confirmedPasswordShown={confirmedPasswordShown}
            />
        </div >
    )
}

export default Signup;