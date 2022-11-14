import { Form, Formik } from 'formik';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../../components/form/InputField';
import InputSelect from '../../components/form/InputSelect';
import TextAreaField from '../../components/form/TextAreaField';
import Footer from '../../components/layout/Footer';
import FindPositionNoSSR from '../../components/map/FindPositionNoSSR';
import { selectCategories } from '../../store/categorySlice';
import { showError } from '../../store/errorSlice';
import { addFeature, selectAddedFeature, selectFeatureError } from '../../store/featureSlice';
import { selectPosition } from '../../store/userSlice';
import { ROME_POSITION } from '../../utils/constants';

const validateNewFeature = (values) => {
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
    console.debug(errors);

    return errors;
};

const NewFeature = () => {
    const storedPosition = useSelector(selectPosition) ?? ROME_POSITION;

    const [position, setPosition] = useState(storedPosition);
    const [wasValidated, setWasValidated] = useState(false);

    const dispatch = useDispatch();
    const addedFeature = useSelector(selectAddedFeature);
    const featureError = useSelector(selectFeatureError);
    const categories = useSelector(selectCategories);

    useEffect(() => {
        if (featureError) {
            dispatch(showError({ featureError }));
        }
    }, [featureError]);

    useEffect(() => {
        if (addedFeature) {
            Router.push(`/features/${addedFeature._id}`);
        }
    }, [addedFeature]);

    const submit = async (values) => {
        const feature = {
            type: 'Feature',
            properties: values,
            geometry: {
                type: 'Point',
                coordinates: [position.lng, position.lat],
            },
        };
        dispatch(addFeature({ feature }));
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

    return (
        <div className="container">
            <h1>Add your new point of interest</h1>
            <p>
                Do you have a new place to share? Fill in the form and contribute to the BiCity
                project. You will help other cyclists to know more about your city.
            </p>
            <FindPositionNoSSR position={position} setPosition={setPosition} />

            <Formik
                initialValues={{}}
                validate={validateNewFeature}
                onSubmit={async (values, { setSubmitting }) => {
                    setWasValidated?.(true);
                    await submit(values);
                    setSubmitting(false);
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
                            data={categories}
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
            <Footer />
        </div>
    );
};

export default NewFeature;
