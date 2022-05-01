import { useAuth } from '../../hooks/useAuth';
import Vote from '../Vote';
import Favorite from './Favorite';

const FeatureItem = ({ feature, onClick }) => {
    const { properties } = feature;
    const featureId = feature._id;

    const { user } = useAuth();
    const userId = user?.profile?._id;
    return (
        <div
            className="element shadow-sm p-3 mb-3 bg-body rounded"
            id={featureId}
            onClick={() => onClick(feature.geometry)}>
            <h1>{properties.name}</h1>

            <Vote featureId={featureId} userId={userId} />
            <Favorite featureId={featureId} userId={userId} />

            {(properties.address || properties.city || properties.country) && (
                <div className="feature-prop">
                    <span className="feature-icon">
                        <i className="fas fa-globe-africa"></i>
                    </span>
                    <span className="txt">
                        {properties.address} {properties.city} {properties.country}
                    </span>
                </div>
            )}

            {properties.phone && (
                <div className="feature-prop">
                    <span className="feature-icon">
                        <i className="fas fa-phone-alt"></i>
                    </span>
                    <span className="txt">{properties.phone}</span>
                    <a href={`tel:${properties.phone}`}>
                        <i className="fas fa-phone-alt"></i>
                    </a>
                </div>
            )}

            {properties.url && (
                <div className="feature-prop">
                    <span className="feature-icon">
                        <i className="fas fa-globe-africa"></i>
                    </span>
                    <span className="txt">{properties.url}</span>
                    <a href={properties.url}>
                        <i className="fas fa-globe-africa"></i>
                    </a>
                </div>
            )}

            {properties.description && (
                <div className="feature-prop">
                    <span className="feature-icon">
                        <i className="fas fa-prescription-bottle"></i>
                    </span>
                    <span className="txt">{properties.description}</span>
                </div>
            )}

            {properties.category && (
                <div className="feature-prop">
                    <span className="feature-icon">
                        <i className="fas fa-clipboard-list"></i>{' '}
                    </span>
                    <span className="txt">{properties.category}</span>
                </div>
            )}
        </div>
    );
};

export default FeatureItem;
