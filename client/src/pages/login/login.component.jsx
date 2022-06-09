import React, { useEffect, useState } from 'react'
import './login.styles.css'

import Loader from '../../components/loader/loader.component'
import LoginSchema from '../../schema/loginSchema.component';

import { Link } from 'react-router-dom'
import { Formik, Field, Form } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const LoginPage = () => {

    const [isLoading, setIsLoading] = useState(true)

    const [passwordShown, setPasswordShown] = useState(false);

    const [whichLogo, setLogo] = useState(true)

    const eye1 = <FontAwesomeIcon icon={faEye} />
    const eye2 = <FontAwesomeIcon icon={faEyeSlash} />

    const toggleVisibility = () => {
        setPasswordShown(!passwordShown);
        setLogo(!whichLogo)
    };

    useEffect(() => {
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
                                placeholder='Email' />
                            {errors.email && touched.email ? (<div className='validation-error-text'>{errors.email}</div>) : null}

                            <h6>Enter Password:</h6>
                            <Field
                                name="password"
                                type={passwordShown ? "text" : "password"}
                                className="element-container"
                                placeholder='password' />
                            <button onClick={toggleVisibility} className="show-password-btn">{whichLogo ? eye1 : eye2}</button>
                            {errors.password && touched.password ? <div className='validation-error-text'>{errors.password}</div> : null}

                            <div>
                                <Link to='/signup' className='signup-link' >Don't have an account? Sign Up</Link>
                            </div>

                            <button type='submit' id='login-button'>Log In</button>

                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoginPage;