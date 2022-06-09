import React, { useState, useEffect } from "react";
import './signup.styles.css'
import { Link } from "react-router-dom";
import Loader from "../../components/loader/loader.component";
import { Formik, Field, Form } from "formik";
import SignupSchema from "../../schema/signupSchema.component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const SignupPage = () => {

    const [isLoading, setIsLoading] = useState(true)

    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmedPasswordShown, setConfirmedPasswordShown] = useState(false);

    const [whichLogo, setLogo] = useState(true)
    const [whichLogoConfirmed, setLogoConfirmed] = useState(true)

    const eye1 = <FontAwesomeIcon icon={faEye} />
    const eye2 = <FontAwesomeIcon icon={faEyeSlash} />

    const toggleVisibility = () => {
        setPasswordShown(!passwordShown);
        setLogo(!whichLogo)
    };

    const toggleVisibilityConfirmed = () => {
        setConfirmedPasswordShown(!confirmedPasswordShown);
        setLogoConfirmed(!whichLogoConfirmed)
    };



    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])

    return isLoading ? (<Loader />) : (

        <div className="signup-page">
            <Formik initialValues={{ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }}
                validationSchema={SignupSchema}>
                {({ errors, touched }) => (

                    <Form>
                        <div className="signup-container">
                            <h1 id="title"> Sign Up</h1>

                            <h6>Enter Your First Name:</h6>
                            <Field
                                name="firstName"
                                type="text"
                                className="element-container"
                                placeholder='First Name'
                            />
                            {errors.firstName && touched.firstName ? (<div className='validation-error-text'>{errors.firstName}</div>) : null}

                            <h6>Enter Your Last Name:</h6>
                            <Field
                                name="lastName"
                                type="text"
                                className="element-container"
                                placeholder='Last Name' />
                            {errors.lastName && touched.lastName ? (<div className='validation-error-text'>{errors.lastName}</div>) : null}
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
                                maxlength="25"
                                className="element-container"
                                placeholder='Password' />
                            <button onClick={toggleVisibility} className="show-password-btn">{whichLogo ? eye1 : eye2}</button>
                            {errors.password && touched.password ? <div className='validation-error-text'>{errors.password}</div> : null}

                            <h6>Enter Password Again:</h6>
                            <Field
                                name="confirmPassword"
                                type={confirmedPasswordShown ? "text" : "password"}
                                maxlength="25"
                                className="element-container"
                                placeholder='Confirm Password' />
                            <button onClick={toggleVisibilityConfirmed} className="show-password-btn">{whichLogoConfirmed ? eye1 : eye2}</button>
                            {errors.confirmPassword && touched.confirmPassword ? (<div className='validation-error-text'>{errors.confirmPassword}</div>) : null}

                            <div>
                                <Link to='/login' className='login-link' >Already have an account? Log In</Link>
                            </div>

                            <button type='submit' id='signup-button'>Sign Up</button>

                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    )
}

export default SignupPage;