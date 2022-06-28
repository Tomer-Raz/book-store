import React, { useEffect, useState } from 'react'
import './login.styles.css'

import Loader from '../../components/loader/loader.component'
import LoginSchema from '../../schema/loginSchema.component';
import environments from '../../environments/environments';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/Auth.context';

import { Link } from 'react-router-dom'
import { Formik, Field, Form } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


const LoginPage = () => {

    const authConextValue = useContext(AuthContext);

    const navigate = useNavigate();

    const API_URL = environments.API_URL;

    const [isLoading, setIsLoading] = useState(true)

    const [passwordShown, setPasswordShown] = useState(false);

    const [whichLogo, setLogo] = useState(true)

    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")

    const eye1 = <FontAwesomeIcon icon={faEye} style={{ color: "gray" }} />
    const eye2 = <FontAwesomeIcon icon={faEyeSlash} style={{ color: "gray" }} />

    const handleEmailInput = (event) => {
        const emailInput = event.target.value.toLowerCase().trim();
        setEmailValue(emailInput);
    }

    const handlePasswordInput = (event) => {
        const passwordInput = event.target.value.trim();
        setPasswordValue(passwordInput);
    }

    const handleLogin = async () => {
        const data = {
            email: emailValue,
            password: passwordValue,
        }
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

            console.log(responseData);

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
            <Formik initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}>
                {({ errors, touched }) => (

                    <Form>
                        <div className='login-container'>
                            <h1 id="title"> Login</h1>

                            <h6>Enter Your email:</h6>
                            <Field
                                name="email"
                                type="text"
                                className="element-container"
                                placeholder='Email'
                                onKeyUp={handleEmailInput} />
                            {errors.email && touched.email ? (<div className='validation-error-text'>{errors.email}</div>) : null}

                            <h6>Enter Password:</h6>
                            <Field
                                name="password"
                                type={passwordShown ? "text" : "password"}
                                className="element-container"
                                placeholder='password'
                                onKeyUp={handlePasswordInput} />
                            <button type="button" onClick={toggleVisibility} className="show-password-btn">{whichLogo ? eye1 : eye2}</button>
                            {errors.password && touched.password ? <div className='validation-error-text'>{errors.password}</div> : null}

                            <div>
                                <Link to='/signup' className='signup-link' >Don't have an account? Sign Up</Link>
                            </div>

                            <button type='submit' disabled={errors.email || errors.password || emailValue === "" || passwordValue === ""} onClick={handleLogin} id='login-button'>Log In</button>

                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoginPage;