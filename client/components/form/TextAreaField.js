import { ErrorMessage, Field } from 'formik';

const TextAreaField = ({ name, label, errors, touched }) => {
    const status = touched?.[name] ? (errors?.[name] ? 'is-invalid' : 'is-valid') : '';
    return (
        <div className="form-outline mb-4">
            <label className="form-label" htmlFor={name}>
                {label}
            </label>
            <Field
                id={name}
                name={name}
                className={`form-control ${status}`}
                as="textarea"
                rows={5}
            />

            <ErrorMessage
                name={name}
                component="div"
                className="invalid-feedback is-invalid"
                className={`invalid-feedback ${status}`}
            />
        </div>
    );
};

export default TextAreaField;
