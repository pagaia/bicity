import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    featureSelected,
    selectFavoritesFeatures,
    selectFeatureId,
    selectFeatures,
} from '../../store/featureSlice';
import { selectAmenities } from '../../store/osmSlice';
import Modal from '../Modal';
import FeatureItem from './FeatureItem';
import OsmFeatureItem from './OsmFeatureItem';

const ModalFeature = () => {
    const { local, osm, favorite } = useSelector(selectFeatureId) || {};

    const features = useSelector(selectFeatures);
    const osmAmenities = useSelector(selectAmenities);
    const favorites = useSelector(selectFavoritesFeatures);

    console.debug({ features, osmAmenities, favorites });
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(featureSelected({}));
    };

    useEffect(() => {
        if (favorite && !favorites.find((f) => (f._id === favorite))) {
            dispatch(featureSelected({}));
        }
    }, [favorite, favorites]);

    return (
        <Modal show={!!local || !!osm || !!favorite}>
            <div className="modal-body">
                <FeatureItem feature={features?.find((item) => item._id === local)} />
                <FeatureItem feature={favorites?.find((item) => item._id === favorite)} />
                <OsmFeatureItem item={osmAmenities?.find((item) => item.id === osm)} />
                {/* <FeatureDetails featureId={local} /> */}
            </div>
            <div className="modal-footer">
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleClose}></button>
            </div>
        </Modal>
    );
};

ModalFeature.propTypes = {
    children: PropTypes.node,
};

export default ModalFeature;
