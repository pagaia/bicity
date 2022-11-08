import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import InputField from '../../components/form/InputField';
import Footer from '../../components/layout/Footer';
import { ROUTES } from '../../utils/routes';

const validateNewUser = (values) => {
    const errors = {};
    const { name, lastName, email, password, password2 } = values;

    if (!name?.trim()) {
        errors.name = 'Required';
    }
    if (!lastName?.trim()) {
        errors.lastName = 'Required';
    }
    if (!email?.trim()) {
        errors.email = 'Required';
    }
    if (!password?.trim()) {
        errors.password = 'Required';
    }
    if (!password2?.trim()) {
        errors.password2 = 'Required';
    }
    if (password?.trim() && password2?.trim() && password?.trim() !== password2?.trim()) {
        errors.password2 = 'Passwords do not match';
    }

    console.debug(errors);

    return errors;
};

const SignUp = () => {
    const [wasValidated, setWasValidated] = useState(false);

    const [submitted, setSubmitted] = useState(null);
    const [error, setError] = useState(null);

    const submit = async (values) => {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...values, username: values.email }),
        };

        const response = await fetch('/api/users', requestOptions);
        const data = await response.json();
        if (response.ok) {
            setSubmitted(data);
        } else {
            setError(data);
        }
    };

    if (submitted) {
        return (
            <div className="container">
                <h1>You have created your new account!</h1>
                <div className="alert alert-success" role="alert">
                    <h2 className="alert-heading">Well done!</h2>
                    <p>You have just registered your account in BiCity</p>
                    <hr />
                    <p className="mb-0">
                        <ul>
                            <li>You can logging in now with your credentials.</li>
                            <li>Insert new points of interest.</li>
                            <li>Select your favorites.</li>
                            <li>Add your vote for the existing ones.</li>
                        </ul>
                        <Link href="/user">Navigate to Login page</Link>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <section className="mt-0 align-items-center d-flex login-section">
                <div className="container-fluid">
                    <div className="row  justify-content-center align-items-center d-flex-row text-center h-100">
                        <div className="col-12 col-md-6 h-50 ">
                            <div className="card shadow">
                                <div className="card-body mx-auto">
                                    <h4 className="card-title mt-3 text-center">Create Account</h4>

                                    <Formik
                                        initialValues={{}}
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
                                                        name="name"
                                                        errors={errors}
                                                        touched={touched}
                                                        placeholder="Name"
                                                    />
                                                </div>
                                                <div className="form-group input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="fa fa-user"></i>
                                                        </span>
                                                    </div>
                                                    <InputField
                                                        name="lastName"
                                                        errors={errors}
                                                        touched={touched}
                                                        placeholder="Lastname"
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
                                                        name="password2"
                                                        type="password"
                                                        errors={errors}
                                                        touched={touched}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-block"
                                                        disabled={isSubmitting}>
                                                        Create Account
                                                    </button>
                                                </div>
                                                <p className="text-center mt-4">
                                                    Have an account?{' '}
                                                    <Link href={ROUTES.USER}>Log In</Link>
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
            <Footer />
        </>
    );
};

export default SignUp;
