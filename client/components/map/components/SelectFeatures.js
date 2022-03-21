import React, { useState } from 'react';
import { useMap } from 'react-leaflet';
import Modal from '../../Modal';
import IconButton from './IconButton';

const SelectFeatures = () => {
    const map = useMap();
    const [viewModal, setModal] = useState(false);

    return (
        <>
            <IconButton
                iconClassName="fa-edit"
                title="Select features to display"
                action={() => setModal(true)}
            />
            <Modal show={viewModal} setOpen={setModal} />
        </>
    );
};

export default SelectFeatures;
