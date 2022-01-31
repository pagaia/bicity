import { ErrorMessage, Field } from 'formik';

const InputField = ({ name, label, errors, touched }) => {
    const status = touched?.[name] ? (errors?.[name] ? 'is-invalid' : 'is-valid') : '';
    return (
        <div className="form-outline mb-4">
            <label className="form-label" htmlFor={name}>
                {label}
            </label>
            <Field type="text" id={name} name={name} className={`form-control ${status}`} />
            <ErrorMessage name={name} component="div" className={`invalid-feedback ${status}`} />
        </div>
    );
};

export default InputField;
