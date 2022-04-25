import { useRouter } from 'next/router';
import FeatureDetails from '../../components/map/Features/FeatureDetails';

const FeaturePage = () => {
    const router = useRouter();
    const { featureId } = router.query;
    return <FeatureDetails featureId={featureId} />;
};

export default FeaturePage;
