import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { featureSelected, selectFeatureId, selectFeatures } from '../../store/featureSlice';
import { selectAmenities } from '../../store/osmSlice';
import Modal from '../Modal';
import FeatureItem from './FeatureItem';
import OsmFeatureItem from './OsmFeatureItem';

const ModalFeature = () => {
    const { local, osm } = useSelector(selectFeatureId) || {};

    const features = useSelector(selectFeatures);
    const osmAmenities = useSelector(selectAmenities);

    console.log({ features, osmAmenities });
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(featureSelected({ local: null, osm: null }));
    };
    return (
        <Modal show={!!local || !!osm}>
            <div className="modal-body">
                <FeatureItem feature={features?.find((item) => item._id === local)} />
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
