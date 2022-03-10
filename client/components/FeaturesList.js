import { useSelector } from 'react-redux';
import { selectFeatures } from '../store/featureSlice';
import FeatureItem from './FeatureItem';

const FeaturesList = ({ map }) => {
    const features = useSelector(selectFeatures);

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
                <FeatureItem feature={feature} onClick={locate} />
            ))}
        </div>
    );
};

export default FeaturesList;
