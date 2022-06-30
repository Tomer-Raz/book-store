import React, { useEffect, useState, useContext } from 'react'
import './login.styles.css'

import Loader from '../../components/loader/Loader.component'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth.context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import LoginFormContainer from './login-form-container/LoginFormContainer.component';
import { userLogin } from '../../services/user.service';

const Login = () => {

    const { userToken, setUserToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true)
    const [passwordShown, setPasswordShown] = useState(false);
    const [whichLogo, setLogo] = useState(true)

    const eye1 = <FontAwesomeIcon icon={faEye} style={{ color: "gray" }} />
    const eye2 = <FontAwesomeIcon icon={faEyeSlash} style={{ color: "gray" }} />

    const handleLogin = async (data) => {
        try {
            const { data: token } = await userLogin(data)

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

    useEffect(() => {
        if (userToken) {
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