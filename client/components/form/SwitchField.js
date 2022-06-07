import { Field } from 'formik';

const SwitchField = ({
    description,
    name,
    className,
    ...props
}) => {
    return (
        <div className={`form-check form-switch ${className ? className : ''}`}>
            <label className="form-check-label">
                <Field type="checkbox" className="form-check-input" name={name} />
                {description}
            </label>
        </div>
    );
};

export default SwitchField;
