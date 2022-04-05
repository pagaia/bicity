import { ErrorMessage, Field } from 'formik';

const InputSelect = ({ name, label, errors, touched }) => {
    const status = touched?.[name] ? (errors?.[name] ? 'is-invalid' : 'is-valid') : '';
    return (
        <div className="form-outline mb-4">
            <label className="form-label" htmlFor={name}>
                {label}
            </label>
            <Field id={name} name={name} className={`form-control ${status}`} as="select">
                <option value="">--</option>
                <option value="dae">Defibrillator</option>
                <option value="bar">Bar bike friendly</option>
                <option value="bike-parking">Bike parking</option>
                <option value="bike-reseller">Bike reseller</option>
            </Field>
            <ErrorMessage
                name={name}
                component="div"
                className={`invalid-feedback ${status}`}
            />
        </div>
    );
};

export default InputSelect;
