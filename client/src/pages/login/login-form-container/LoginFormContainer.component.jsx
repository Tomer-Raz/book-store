import React, { useState, useContext } from 'react'
import LoginSchema from '../../../schema/LoginSchema.component';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { AuthContext } from '../../../context/Auth.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { ERROR_MESSAGE, USER_TOKEN } from '../../../constants/constants';
import { userLogin } from '../../../services/user.service';

const LoginFormContainer = () => {

    const navigate = useNavigate();
    const { setUserToken } = useContext(AuthContext);
    const [passwordShown, setPasswordShown] = useState(false);
    const [whichLogo, setLogo] = useState(true)

    const eye1 = <FontAwesomeIcon icon={faEye} style={{ color: "gray" }} />
    const eye2 = <FontAwesomeIcon icon={faEyeSlash} style={{ color: "gray" }} />

    const handleLogin = async (data) => {
        try {
            const { data: token } = await userLogin(data)

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
                        <Field name="password" type={passwordShown ? "text" : "password"} className="element-container" placeholder='Password' />
                        <button type="button" onClick={toggleVisibility} className="show-password-btn">{whichLogo ? eye1 : eye2}</button>
                        {errors.password && touched.password ? <div className='validation-error-text'>{errors.password}</div> : null}

                        <div>
                            <Link to='/signup' className='signup-link' >Don't have an account? Sign Up</Link>
                        </div>

                        <button type='submit' onClick={function () {
                            handleLogin({
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
