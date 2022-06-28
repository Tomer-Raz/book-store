import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({

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
});

export default LoginSchema;