import PropTypes from 'prop-types';

const ExternalLink = ({ url, children, className = 'mr-1 ml-1', title }) => {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className={className} title={title}>
            {children}
        </a>
    );
};

ExternalLink.propTypes = {
    url: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    className: PropTypes.string,
    title: PropTypes.string
};
export default ExternalLink;
