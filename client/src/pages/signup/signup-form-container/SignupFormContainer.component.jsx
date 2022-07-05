import React, { useState, useContext } from 'react'
import { Formik, Field, Form } from 'formik';
import SignupSchema from '../../../schema/SignupSchema.component';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/Auth.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { ERROR_MESSAGE, USER_TOKEN } from '../../../constants/constants';
import { createUser } from '../../../services/user.service';

const SignupFormContainer = () => {

    const navigate = useNavigate();
    const { setUserToken } = useContext(AuthContext);

    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmedPasswordShown, setConfirmedPasswordShown] = useState(false);

    const [whichLogo, setLogo] = useState(true)
    const [whichLogoConfirmed, setLogoConfirmed] = useState(true)

    const eye1 = <FontAwesomeIcon icon={faEye} style={{ color: "gray" }} />
    const eye2 = <FontAwesomeIcon icon={faEyeSlash} style={{ color: "gray" }} />

    const handleSignup = async (data) => {
        try {
            const { data: token } = await createUser(data)

            localStorage.setItem(USER_TOKEN, token.token);
            setUserToken(token.token);

            navigate('/');

        } catch (err) {
            alert(ERROR_MESSAGE)
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

    return (

        <Formik initialValues={{ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }}
            validationSchema={SignupSchema}>
            {({ errors, touched, values }) => (

                <Form>
                    <div className="signup-container">
                        <h1 id="title"> Sign Up</h1>

                        <h6>Enter Your First Name:</h6>
                        <Field name="firstName" type="text" className="element-container" placeholder='First Name' />
                        {errors.firstName && touched.firstName ? (<div className='validation-error-text'>{errors.firstName}</div>) : null}

                        <h6>Enter Your Last Name:</h6>
                        <Field name="lastName" type="text" className="element-container" placeholder='Last Name' />
                        {errors.lastName && touched.lastName ? (<div className='validation-error-text'>{errors.lastName}</div>) : null}

                        <h6>Enter Your email:</h6>
                        <Field name="email" type="text" className="element-container" placeholder='Email' />
                        {errors.email && touched.email ? (<div className='validation-error-text'>{errors.email}</div>) : null}

                        <h6>Enter Password:</h6>
                        <Field id="enter-password-input" name="password" type={passwordShown ? "text" : "password"} maxLength="25" className="element-container" placeholder='Password' />
                        <button type="button" onClick={toggleVisibility} className="show-password-btn">{whichLogo ? eye1 : eye2}</button>
                        {errors.password && touched.password ? <div className='validation-error-text'>{errors.password}</div> : null}

                        <h6>Enter Password Again:</h6>
                        <Field id="enter-password-input" name="confirmPassword" type={confirmedPasswordShown ? "text" : "password"} maxLength="25" className="element-container" placeholder='Confirm Password' />
                        <button type="button" onClick={toggleVisibilityConfirmed} className="show-password-btn">{whichLogoConfirmed ? eye1 : eye2}</button>
                        {errors.confirmPassword && touched.confirmPassword ? (<div className='validation-error-text'>{errors.confirmPassword}</div>) : null}

                        <div>
                            <Link to='/login' className='login-link' >Already have an account? <br /> Log In</Link>
                        </div>

                        <button type='submit' onClick={function () {
                            handleSignup({
                                firstName: values.firstName,
                                lastName: values.lastName,
                                email: values.email,
                                password: values.password,
                            })
                        }}

                            disabled={
                                values.email === "" || errors.email ||
                                values.password === "" || errors.password ||
                                values.firstName === "" || errors.firstName ||
                                values.lastName === "" || errors.lastName ||
                                values.confirmPassword === "" || errors.confirmPassword
                            }
                            id='signup-button'>Sign Up</button>

                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default SignupFormContainer;
