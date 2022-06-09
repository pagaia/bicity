import PropTypes from 'prop-types';
import ExternalLink from '../../ExternalLink';

const Website = ({ value }) => {
    if (!value) {
        return null;
    }
    return (
        <div className="feature-prop">
            <span className="feature-icon">
                <ExternalLink url={value} title={`Go to ${value}`}>
                    <i className="fas fa-globe-africa"></i>
                </ExternalLink>
            </span>
            <span className="txt">{value}</span>
        </div>
    );
};

Website.propTypes = {
    value: PropTypes.string,
};
export default Website;
