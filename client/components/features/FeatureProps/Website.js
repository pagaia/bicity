import PropTypes from 'prop-types';
import ExternalLink from '../../ExternalLink';

const Website = ({ value }) => {
    return (
        <div className="feature-prop">
            <span className="feature-icon">
                <i className="fas fa-globe-africa"></i>
            </span>
            <span className="txt">{value}</span>
            <ExternalLink url={value} title={`Go to ${value}`}>
                <i className="fas fa-globe-africa"></i>
            </ExternalLink>
        </div>
    );
};

Website.propTypes = {
    value: PropTypes.string,
};
export default Website;
