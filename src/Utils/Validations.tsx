import * as yup from 'yup';

const EMAIL_REGEX =
    /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,6}|[0-9]{1,3})(\]?)$/;

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required')
        .matches(EMAIL_REGEX, 'Please enter a valid email'),

    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

export const signupSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Name is required'),

    email: yup
        .string()
        .required('Email is required')
        .matches(EMAIL_REGEX, 'Please enter a valid email'),

    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});