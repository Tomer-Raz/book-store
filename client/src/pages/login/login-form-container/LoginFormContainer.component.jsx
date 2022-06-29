import React from 'react'
import LoginSchema from '../../../schema/LoginSchema.component';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';

const LoginFormContainer = (props) => {

    return (

        <Formik initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}>
            {({ errors, touched, values }) => (

                <Form>
                    <div className='login-container'>
                        <h1 id="title"> Login</h1>

                        <h6>Enter Your email:</h6>
                        <Field name="email" type="text" className="element-container" placeholder='Email' />
                        {errors.email && touched.email ? (<div className='validation-error-text'>{errors.email}</div>) : null}

                        <h6>Enter Password:</h6>
                        <Field name="password" type={props.passwordShown ? "text" : "password"} className="element-container" placeholder='Password' />
                        <button type="button" onClick={props.toggleVisibility} className="show-password-btn">{props.whichLogo ? props.eye1 : props.eye2}</button>
                        {errors.password && touched.password ? <div className='validation-error-text'>{errors.password}</div> : null}

                        <div>
                            <Link to='/signup' className='signup-link' >Don't have an account? Sign Up</Link>
                        </div>

                        <button type='submit' onClick={function () {
                            props.handleLogin({
                                email: values.email,
                                password: values.password
                            })
                        }}
                            disabled={errors.email || errors.password || values.email === "" || values.password === ""} id='login-button'>Log In</button>
                    </div>
                </Form>

            )}
        </Formik>
    )
}

export default LoginFormContainer;
