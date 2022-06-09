import { useAuth } from '../../hooks/useAuth';
import RandomPicture from '../ui/RandomPicture';
import Vote from '../Vote';
import Direction from './Direction';
import Favorite from './Favorite';
import FeatureProp from './FeatureProps/Hours';
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
        <div className="card element shadow-sm mb-3 bg-body rounded" id={featureId}>
            <RandomPicture />

            <h1>{properties.name}</h1>
            <Favorite featureId={featureId} userId={userId} />

            <Vote featureId={featureId} userId={userId} />

            <FeatureProp
                value={`${properties.address ?? ''} ${properties.city ?? ''} ${
                    properties.country ?? ''
                }`}
                iconClass="fas fa-globe-africa"
            />

            <Phone value={properties.phone} />

            <Website value={properties.url} />

            <FeatureProp value={properties.description} iconClass="fas fa-prescription-bottle" />

            <FeatureProp value={properties.category} iconClass="fas fa-clipboard-list" />
            <FeatureProp value={properties.hours} iconClass="fas fa-clock" />
            <FeatureProp value={properties.rate} iconClass="fas fa-money-bill" />
            <FeatureProp value={properties.space_for_disables} iconClass="fas fa-wheelchair" />
            <FeatureProp value={properties.total} iconClass="fas fa-table" />
            <FeatureProp value={properties.tpl} iconClass="fas fa-bus" />

            <Direction lat={lat} long={long} />
        </div>
    );
};

export default FeatureItem;
