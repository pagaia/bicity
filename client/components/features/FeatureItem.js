import { useAuth } from '../../hooks/useAuth';
import RandomPicture from '../ui/RandomPicture';
import Vote from '../Vote';
import Direction from './Direction';
import Favorite from './Favorite';
import Phone from './FeatureProps/Phone';
import Website from './FeatureProps/Website';

const FeatureItem = ({ feature, onClick }) => {
    if (!feature) {
        return null;
    }
    const { properties } = feature;
    const lat = feature.geometry.coordinates[1];
    const long = feature.geometry.coordinates[0];

    const featureId = feature._id;

    const { user } = useAuth();
    const userId = user?.profile?._id;

    return (
        <div className="element shadow-sm p-3 mb-3 bg-body rounded" id={featureId}>
            <RandomPicture />

            <h1>{properties.name}</h1>
            <Favorite featureId={featureId} userId={userId} />

            <Vote featureId={featureId} userId={userId} />

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

            {properties.phone && <Phone value={properties.phone} />}

            {properties.url && <Website value={properties.url} />}

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

            <Direction lat={lat} long={long} />
        </div>
    );
};

export default FeatureItem;
