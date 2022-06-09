import axios from 'axios';
import { useEffect, useState } from 'react';
import Spinner from '../ui/Spinner';
import FeatureItem from './FeatureItem';

const FeatureDetails = (props) => {
    const { featureId } = props;

    const [feature, setFeature] = useState(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchFeatureDetails = async () => {
            console.debug({ featureId });
            if (featureId) {
                const response = await axios(`/api/feature/${featureId}`);
                const { data } = response;
                setFeature(data);
                setFetching(false);
            }
        };
        fetchFeatureDetails();
    }, [featureId]);

    if (!featureId) {
        return null;
    }

    if (fetching) {
        return (
            <div className="container">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="container">
            <FeatureItem feature={feature} />
        </div>
    );
};

export default FeatureDetails;
