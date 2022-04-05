import { useSelector } from 'react-redux';
import { selectFeatures } from '../../store/featureSlice';
import { selectAmenities } from '../../store/osmSlice';
import FeatureItem from './FeatureItem';
import OsmFeatureItem from './OsmFeatureItem';

const FeaturesList = ({ map }) => {
    const features = useSelector(selectFeatures);
    const osmAmenities = useSelector(selectAmenities);

    if (!features) {
        return null;
    }

    const locate = (position) => {
        console.log({ position });
        const [lng, lat] = position?.coordinates;
        console.log({ lat, lng });
        map?.flyTo({ lat, lng }, 18);
    };

    return (
        <div id="list">
            {features?.map((feature) => (
                <FeatureItem feature={feature} onClick={locate} key={feature._id} />
            ))}
            {osmAmenities?.map((item) => (
                <OsmFeatureItem key={item.id} item={item} onClick={locate} />
            ))}
        </div>
    );
};

export default FeaturesList;
