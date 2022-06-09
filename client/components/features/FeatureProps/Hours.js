import PropTypes from 'prop-types';

const FeatureProp = ({ value, iconClass }) => {
    if (!value ?? (typeof value === 'string' && !value?.trim?.())) {
        return null;
    }
    return (
        <>
            <div className="feature-prop">
                <span className="feature-icon">
                    <i className={iconClass}></i>
                </span>
                <span className="txt">{value}</span>
            </div>
        </>
    );
};

FeatureProp.propTypes = {
    value: PropTypes.string,
};
export default FeatureProp;
