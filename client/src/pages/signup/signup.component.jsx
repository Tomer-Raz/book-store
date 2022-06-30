import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import './signup.styles.css'
import Loader from "../../components/loader/Loader.component";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from "../../context/Auth.context";
import SignupFormContainer from "./signup-form-container/SignupFormContainer.component";
import { createUser } from "../../services/user.service";

const Signup = () => {

    const navigate = useNavigate();
    const { userToken, setUserToken } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true)

    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmedPasswordShown, setConfirmedPasswordShown] = useState(false);

    const [whichLogo, setLogo] = useState(true)
    const [whichLogoConfirmed, setLogoConfirmed] = useState(true)

    const eye1 = <FontAwesomeIcon icon={faEye} style={{ color: "gray" }} />
    const eye2 = <FontAwesomeIcon icon={faEyeSlash} style={{ color: "gray" }} />

    const handleSignup = async (data) => {
        try {
            const { data: token } = await createUser(data)

            localStorage.setItem('user-token', token.token);
            setUserToken(token.token);

            navigate('/');

        } catch (err) {
            alert('Wrong email or password')
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
        if (userToken) {
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