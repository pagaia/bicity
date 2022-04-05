import { Field } from 'formik';

const SwitchField = ({
    description,
    name,
    // field, // { name, value, onChange, onBlur }
    // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    return (
        <div className="form-check form-switch">
            <label className="form-check-label">
                <Field type="checkbox" className="form-check-input" name={name} />
                {description}
            </label>
        </div>
    );
};

export default SwitchField;
