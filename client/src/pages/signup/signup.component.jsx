import React, { useState, useEffect } from "react";
import './signup.styles.css'
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/loader.component";
import { Formik, Field, Form } from "formik";
import SignupSchema from "../../schema/signupSchema.component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import environments from "../../environments/environments";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth.context";

const SignupPage = () => {

    const API_URL = environments.API_URL;
    const navigate = useNavigate();
    const authConextValue = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(true)

    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmedPasswordShown, setConfirmedPasswordShown] = useState(false);

    const [whichLogo, setLogo] = useState(true)
    const [whichLogoConfirmed, setLogoConfirmed] = useState(true)

    const [firstNameValue, setFirstNameValue] = useState("")
    const [lastNameValue, setLastNameValue] = useState("")
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("")

    const eye1 = <FontAwesomeIcon icon={faEye} style={{ color: "gray" }} />
    const eye2 = <FontAwesomeIcon icon={faEyeSlash} style={{ color: "gray" }} />

    const handleFirstNameInput = (event) => {
        const firstNameInput = event.target.value.trim();
        setFirstNameValue(firstNameInput);
    }

    const handleLastNameInput = (event) => {
        const lastNameInput = event.target.value.trim();
        setLastNameValue(lastNameInput);
    }

    const handleEmailInput = (event) => {
        const emailInput = event.target.value.toLowerCase().trim();
        setEmailValue(emailInput);
    }

    const handlePasswordInput = (event) => {
        const passwordInput = event.target.value.trim();
        setPasswordValue(passwordInput);
    }

    const handleConfirmPasswordInput = (event) => {
        const confirmPasswordValue = event.target.value.trim();
        setConfirmPasswordValue(confirmPasswordValue);
    }

    const handleSignup = async () => {
        const data = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            password: passwordValue,
        }
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
                                onKeyUp={handleFirstNameInput}
                            />
                            {errors.firstName && touched.firstName ? (<div className='validation-error-text'>{errors.firstName}</div>) : null}

                            <h6>Enter Your Last Name:</h6>
                            <Field
                                name="lastName"
                                type="text"
                                className="element-container"
                                placeholder='Last Name'
                                onKeyUp={handleLastNameInput} />
                            {errors.lastName && touched.lastName ? (<div className='validation-error-text'>{errors.lastName}</div>) : null}
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
                                maxLength="25"
                                className="element-container"
                                placeholder='Password'
                                onKeyUp={handlePasswordInput} />
                            <button type="button" onClick={toggleVisibility} className="show-password-btn">{whichLogo ? eye1 : eye2}</button>
                            {errors.password && touched.password ? <div className='validation-error-text'>{errors.password}</div> : null}

                            <h6>Enter Password Again:</h6>
                            <Field
                                name="confirmPassword"
                                type={confirmedPasswordShown ? "text" : "password"}
                                maxLength="25"
                                className="element-container"
                                placeholder='Confirm Password'
                                onKeyUp={handleConfirmPasswordInput} />
                            <button type="button" onClick={toggleVisibilityConfirmed} className="show-password-btn">{whichLogoConfirmed ? eye1 : eye2}</button>
                            {errors.confirmPassword && touched.confirmPassword ? (<div className='validation-error-text'>{errors.confirmPassword}</div>) : null}

                            <div>
                                <Link to='/login' className='login-link' >Already have an account? Log In</Link>
                            </div>

                            <button type='submit' disabled={
                                emailValue === "" || errors.email ||
                                passwordValue === "" || errors.password ||
                                firstNameValue === "" || errors.firstName ||
                                lastNameValue === "" || errors.lastName ||
                                confirmPasswordValue === "" || errors.confirmPassword
                            }
                                id='signup-button' onClick={handleSignup}>Sign Up</button>

                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    )
}

export default SignupPage;