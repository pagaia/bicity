import { ErrorMessage, Field } from 'formik';

const InputField = ({ name, label, errors, touched, type = 'text' }) => {
    const status = touched?.[name] ? (errors?.[name] ? 'is-invalid' : 'is-valid') : '';
    return (
        <div className="form-outline mb-4">
            {label && (
                <label className="form-label" htmlFor={name}>
                    {label}
                </label>
            )}
            <Field type={type} id={name} name={name} className={`form-control ${status}`} />
            <ErrorMessage name={name} component="div" className={`invalid-feedback ${status}`} />
        </div>
    );
};

export default InputField;
