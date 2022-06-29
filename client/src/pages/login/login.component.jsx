import React, { useEffect, useState, useContext } from 'react'
import './login.styles.css'

import Loader from '../../components/loader/Loader.component'
import environments from '../../environments/environments';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth.context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import LoginFormContainer from './login-form-container/LoginFormContainer.component';

const Login = () => {

    const authConextValue = useContext(AuthContext);
    const navigate = useNavigate();
    const API_URL = environments.API_URL;

    const [isLoading, setIsLoading] = useState(true)
    const [passwordShown, setPasswordShown] = useState(false);
    const [whichLogo, setLogo] = useState(true)

    const eye1 = <FontAwesomeIcon icon={faEye} style={{ color: "gray" }} />
    const eye2 = <FontAwesomeIcon icon={faEyeSlash} style={{ color: "gray" }} />

    const handleLogin = async (data) => {
        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error();
            }

            const responseData = await response.json();
            const token = responseData.data.token;

            localStorage.setItem('user-token', token);
            authConextValue.setUserToken(token);

            navigate('/');

        } catch (err) {
            alert('Wrong email or password')
        }
    }

    const toggleVisibility = () => {
        setPasswordShown(!passwordShown);
        setLogo(!whichLogo)
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

        <div className='login-page'>
            <LoginFormContainer
                handleLogin={handleLogin}
                toggleVisibility={toggleVisibility}
                eye1={eye1}
                eye2={eye2}
                whichLogo={whichLogo}
                passwordShown={passwordShown}
            />
        </div>
    )
}

export default Login;