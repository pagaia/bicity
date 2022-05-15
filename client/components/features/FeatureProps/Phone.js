import PropTypes from 'prop-types';

const Phone = ({ value }) => {
    return (
        <>
            <div className="feature-prop">
                <span className="feature-icon">
                    <i className="fas fa-phone-alt"></i>
                </span>
                <span className="txt">{value}</span>
                <a href={`tel:${value}`}>
                    <i className="fas fa-phone-alt"></i>
                </a>
            </div>
        </>
    );
};

Phone.propTypes = {
    value: PropTypes.string,
};
export default Phone;
