import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.styles.css'
import Loader from '../../components/loader/Loader.component'
import LoginFormContainer from './login-form-container/LoginFormContainer.component';
import { AuthContext } from '../../context/Auth.context';

const Login = () => {

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

        <div className='login-page'>
            <LoginFormContainer />
        </div>
    )
}

export default Login;