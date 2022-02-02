import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import InputField from './form/InputField';

const Login = () => {
    const [wasValidated, setWasValidated] = useState(false);
    const { user, signIn, signOut } = useAuth();

    return (
        <section className="pt-5 pb-5 mt-0 align-items-center d-flex bg-dark login-section">
            <div className="container-fluid">
                <div className="row  justify-content-center align-items-center d-flex-row text-center h-100">
                    <div className="col-12 col-md-4 col-lg-3 h-50 ">
                        <div className="card shadow">
                            <div className="card-body mx-auto">
                                <h4 className="card-title mt-3 text-center">Create Account</h4>
                                <p className="text-center">Get started with your free account</p>
                                <p>
                                    <a href="" className="btn btn-block btn-info login-button">
                                        <i className="fab fa-twitter me-2"></i>Login via Twitter
                                    </a>
                                    <button
                                        onClick={signIn}
                                        className="btn btn-block btn-warning login-button">
                                        <i className="fab fa-google me-2"></i>Login via Google
                                    </button>
                                    <a href="" className="btn btn-block btn-primary login-button">
                                        <i className="fab fa-facebook-f me-2"></i>Login via facebook
                                    </a>
                                </p>
                                <p className="text-muted font-weight-bold ">
                                    <span>OR</span>
                                </p>
                                <Formik
                                    initialValues={{ name: 'Hay Biker' }}
                                    validate={() => {}}
                                    onSubmit={async (values, { setSubmitting }) => {
                                        setWasValidated?.(true);
                                        // await submit(values);
                                        // setSubmitting(false);
                                        // setTimeout(() => {
                                        //   alert(JSON.stringify(values, null, 2));
                                        //   setSubmitting(false);
                                        // }, 400);
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
                                                    name="name"
                                                    errors={errors}
                                                    touched={touched}
                                                    placeholder="Email address"
                                                />
                                            </div>
                                            <div className="form-group input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-envelope"></i>
                                                    </span>
                                                </div>
                                                <InputField
                                                    name="email"
                                                    errors={errors}
                                                    touched={touched}
                                                    placeholder="Email address"
                                                />
                                            </div>
                                            <div className="form-group input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-lock"></i>
                                                    </span>
                                                </div>
                                                <InputField
                                                    placeholder="Your password"
                                                    name="password"
                                                    type="password"
                                                    errors={errors}
                                                    touched={touched}
                                                />
                                            </div>
                                            <div className="form-group input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-lock"></i>
                                                    </span>
                                                </div>
                                                <InputField
                                                    placeholder="Repeat password"
                                                    name="password-repeat"
                                                    type="password"
                                                    errors={errors}
                                                    touched={touched}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-block">
                                                    Create Account
                                                </button>
                                            </div>
                                            <p className="text-center">
                                                Have an account?
                                                <a href="">Log In</a>
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
