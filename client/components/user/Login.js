import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import InputField from '../form/InputField';
import Link from 'next/link';
import axios from 'axios';
import { ROUTES } from '../../utils/routes';
import Footer from '../layout/Footer';

const validateNewUser = (values) => {
    const errors = {};
    const { username, password } = values;

    if (!username?.trim()) {
        errors.username = 'Required';
    }

    if (!password?.trim()) {
        errors.password = 'Required';
    }

    console.log(errors);

    return errors;
};

const Login = () => {
    const [wasValidated, setWasValidated] = useState(false);
    const { googleSignIn, oauthFacebookSignIn, oauthTwitterSignIn, setUser } = useAuth();

    const submit = async (values) => {
        const body = JSON.stringify(values);
        const headers = { 'Content-Type': 'application/json' };
        const response = await axios.post('/api/users/login', body, { headers });

        // get the authorization from the header
        const { authorization } = response.headers;
        // get the user profile from the body
        const { data } = response;

        // store user profile and JWT for future calls
        setUser({ profile: data, authorization });
    };

    return (
        <section className="mt-0 align-items-center d-flex login-section">
            <div className="container-fluid">
                <div className="row  justify-content-center align-items-center d-flex-row text-center">
                    <div className="col-12 col-md-6 h-50 ">
                        <div className="card shadow">
                            <div className="card-body mx-auto">
                                <h4 className="card-title mt-3 text-center">Login</h4>
                                <p className="text-center">Get started with your free account</p>
                                <p className="d-flex flex-column ">
                                    <button
                                        onClick={oauthTwitterSignIn}
                                        className="btn btn-block btn-info login-button">
                                        <i className="fab fa-twitter me-2"></i>Login via Twitter
                                    </button>
                                    <button
                                        onClick={googleSignIn}
                                        className="btn btn-block btn-warning login-button">
                                        <i className="fab fa-google me-2"></i>Login via Google
                                    </button>
                                    <button
                                        onClick={oauthFacebookSignIn}
                                        className="btn btn-block btn-primary login-button">
                                        <i className="fab fa-facebook-f me-2"></i>Login via facebook
                                    </button>
                                </p>
                                <p className="text-muted font-weight-bold ">
                                    <span>OR</span>
                                </p>
                                <Formik
                                    initialValues={{ name: 'Hay Biker' }}
                                    validate={validateNewUser}
                                    onSubmit={async (values, { setSubmitting }) => {
                                        setSubmitting(true);
                                        setWasValidated?.(true);
                                        await submit(values);
                                        setSubmitting(false);
                                    }}>
                                    {({ isSubmitting, errors, touched, values }) => (
                                        <Form
                                            className={`mb-4 ${
                                                wasValidated ? 'was-validated' : ''
                                            }`}>
                                            <div className="form-group input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-user"></i>
                                                    </span>
                                                </div>
                                                <InputField
                                                    name="username"
                                                    errors={errors}
                                                    touched={touched}
                                                    placeholder="Username"
                                                />
                                            </div>
                                            <div className="form-group input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-user"></i>
                                                    </span>
                                                </div>
                                                <InputField
                                                    name="password"
                                                    type="password"
                                                    errors={errors}
                                                    touched={touched}
                                                    placeholder="Password"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-block"
                                                    disabled={isSubmitting}>
                                                    Login
                                                </button>
                                            </div>
                                            <p className="text-center">
                                                Don't have an account?
                                                <Link href={ROUTES.USER_SIGNUP}>
                                                    <a>Sign up</a>
                                                </Link>
                                            </p>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
