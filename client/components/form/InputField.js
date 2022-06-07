import { ErrorMessage, Field } from 'formik';

const InputField = ({ name, label, errors, touched, placeholder, type = 'text' }) => {
    const status = touched?.[name] ? (errors?.[name] ? 'is-invalid' : 'is-valid') : '';
    return (
        <div className="form-outline mb-3">
            {label && (
                <label className="" htmlFor={name}>
                    {label}
                </label>
            )}
            <Field
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                className={`form-control ${status}`}
            />
            <ErrorMessage name={name} component="div" className={`invalid-feedback ${status}`} />
        </div>
    );
};

export default InputField;
