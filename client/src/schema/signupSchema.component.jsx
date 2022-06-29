import * as Yup from 'yup';
import YupPassword from 'yup-password'
YupPassword(Yup)

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
        .minLowercase(1, "Password must include a lowercase letter")
        .minUppercase(1, "Password must include an uppercase letter")
        .minNumbers(1, "Password must include a number")
        .trim()
        .required(""),

    confirmPassword: Yup
        .string()
        .trim()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required(""),
});

export default SignupSchema