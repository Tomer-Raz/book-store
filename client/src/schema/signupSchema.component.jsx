import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({

    firstName: Yup
        .string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .max(20)
        .required(""),

    lastName: Yup
        .string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .max(20)
        .required(""),

    email: Yup
        .string()
        .trim()
        .email('Invalid email')
        .required(""),

    password: Yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(20, 'Password must be less than 20 charcters')
        .trim()
        .required(""),

    confirmPassword: Yup
        .string()
        .trim()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required(""),
});

export default SignupSchema