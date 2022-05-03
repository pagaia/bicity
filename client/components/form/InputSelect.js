import { ErrorMessage, Field } from 'formik';

const InputSelect = ({ name, label, errors, touched, data }) => {
    const status = touched?.[name] ? (errors?.[name] ? 'is-invalid' : 'is-valid') : '';
    return (
        <div className="form-outline mb-4">
            <label className="form-label" htmlFor={name}>
                {label}
            </label>
            <Field id={name} name={name} className={`form-control ${status}`} as="select">
                <option value="">--</option>
                {data.map((item) => (
                    <option key={item.name} value={item.name}>
                        {item.name}
                    </option>
                ))}
            </Field>
            <ErrorMessage name={name} component="div" className={`invalid-feedback ${status}`} />
        </div>
    );
};

export default InputSelect;
