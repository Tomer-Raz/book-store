import React from 'react'
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import SignupSchema from '../../../schema/SignupSchema.component';

const SignupFormContainer = (props) => {

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
                        <Field id="enter-password-input" name="password" type={props.passwordShown ? "text" : "password"} maxLength="25" className="element-container" placeholder='Password' />
                        <button type="button" onClick={props.toggleVisibility} className="show-password-btn">{props.whichLogo ? props.eye1 : props.eye2}</button>
                        {errors.password && touched.password ? <div className='validation-error-text'>{errors.password}</div> : null}

                        <h6>Enter Password Again:</h6>
                        <Field id="enter-password-input" name="confirmPassword" type={props.confirmedPasswordShown ? "text" : "password"} maxLength="25" className="element-container" placeholder='Confirm Password' />
                        <button type="button" onClick={props.toggleVisibilityConfirmed} className="show-password-btn">{props.whichLogoConfirmed ? props.eye1 : props.eye2}</button>
                        {errors.confirmPassword && touched.confirmPassword ? (<div className='validation-error-text'>{errors.confirmPassword}</div>) : null}

                        <div>
                            <Link to='/login' className='login-link' >Already have an account? <br /> Log In</Link>
                        </div>

                        <button type='submit' onClick={function () {
                            props.handleSignup({
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
