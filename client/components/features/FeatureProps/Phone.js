import PropTypes from 'prop-types';

const Phone = ({ value }) => {
    if (!value) {
        return null;
    }

    return (
        <>
            <div className="feature-prop">
                <span className="feature-icon">
                    <a href={`tel:${value}`} title={`call number ${value}`}>
                        <i className="fas fa-phone-alt"></i>
                    </a>
                </span>
                <span className="txt">{value}</span>
            </div>
        </>
    );
};

Phone.propTypes = {
    value: PropTypes.string,
};
export default Phone;
