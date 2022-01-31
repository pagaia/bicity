import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import FindPositionNoSSR from '../../components/map/FindPositionNoSSR';
import InputField from '../../components/form/InputField';
import InputSelect from '../../components/form/InputSelect';
import { ROME_POSITION } from '../../utils/constants';
import ErrorMessage from '../../components/ErrorMessage';
import TextAreaField from '../../components/form/TextAreaField';
import Link from 'next/link';

const validateNexFeature = (values) => {
    const errors = {};
    const { address, city, country, cap, name, category } = values;

    if (!name?.trim()) {
        errors.name = 'Required';
    }
    if (!address?.trim()) {
        errors.address = 'Required';
    }
    if (!city?.trim()) {
        errors.city = 'Required';
    }
    if (!country?.trim()) {
        errors.country = 'Required';
    }
    if (!cap?.trim()) {
        errors.cap = 'Required';
    }
    if (!category?.trim()) {
        errors.category = 'Required';
    }
    console.log(errors);

    return errors;
};

const NewFeature = () => {
    const [position, setPosition] = useState(ROME_POSITION);
    const [wasValidated, setWasValidated] = useState(false);

    const [submitted, setSubmitted] = useState(null);
    const [error, setError] = useState(null);

    const submit = async (values) => {
        const payload = {
            type: 'Feature',
            properties: values,
            geometry: {
                type: 'Point',
                coordinates: [position.lng, position.lat],
            },
        };

        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        };

        const response = await fetch('/api/feature', requestOptions);
        const data = await response.json();
        if (response.ok) {
            setSubmitted(data);
        } else {
            setError(data);
        }
    };

    const handleGeoCoding = (values) => {
        const { address, city, country, cap } = values;
        if (!address || !city || !country || !cap) {
            alert('Please provide Address, City, Country and Cap');
            return;
        }
        fetch(
            `https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.NEXT_PUBLIC_MAPQUEST_KEY}&location=${address},${city},${cap},${country}`
        )
            .then((res) => res.json())
            .then((data) => {
                setPosition(data?.results?.[0]?.locations?.[0]?.latLng);
            });
    };

    if (submitted) {
        return (
            <div className="container">
                <h1>Any place in your app!</h1>
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Well done!</h4>
                    <p>
                        You have just submitted a new place! We will review and share with the
                        community
                    </p>
                    <hr />
                    <p className="mb-0">
                        You can go now in the home page and search for this new point of interest.
                        Or you can view all details at the following link{' '}
                        <Link href={`/features/${submitted._id}`}>
                            <a>{submitted?.properties?.name}</a>
                        </Link>
                    </p>

                    <pre>{JSON.stringify(submitted)}</pre>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Let's the community know</h1>
            <p>Do you have a new place to share? Fill in the form and give your biCity</p>
            <ErrorMessage message={error} />
            <Formik
                initialValues={{ name: 'Hay Biker' }}
                validate={validateNexFeature}
                onSubmit={async (values, { setSubmitting }) => {
                    setWasValidated?.(true);
                    await submit(values);
                    setSubmitting(false);
                    // setTimeout(() => {
                    //   alert(JSON.stringify(values, null, 2));
                    //   setSubmitting(false);
                    // }, 400);
                }}>
                {({ isSubmitting, errors, touched, values }) => (
                    <Form className={`mb-4 ${wasValidated ? 'was-validated' : ''}`}>
                        <InputField label="Name" name="name" errors={errors} touched={touched} />
                        <InputField label="Url" name="url" errors={errors} touched={touched} />
                        <InputField label="Phone" name="phone" errors={errors} touched={touched} />
                        <InputField
                            label="Address"
                            name="address"
                            errors={errors}
                            touched={touched}
                        />
                        <InputField label="City" name="city" errors={errors} touched={touched} />
                        <InputField label="Cap" name="cap" errors={errors} touched={touched} />
                        <InputField
                            label="Country"
                            name="country"
                            errors={errors}
                            touched={touched}
                        />
                        <InputSelect
                            label="Category"
                            name="category"
                            errors={errors}
                            touched={touched}
                        />

                        <TextAreaField
                            label="Description"
                            name="description"
                            errors={errors}
                            touched={touched}
                        />

                        <div>
                            <button
                                type="button"
                                className="btn btn-secondary me-4"
                                onClick={() => handleGeoCoding(values)}>
                                Geo locate
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            <FindPositionNoSSR position={position} setPosition={setPosition} />
        </div>
    );
};

export default NewFeature;
