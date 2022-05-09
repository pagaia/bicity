import { useState } from 'react';
import Modal from '../components/Modal';

const Settings = () => {
    const [viewModal, setModal] = useState(false);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>BiCity - INFO</h1>
                    <p>
                        You use your bike to move around in the city? Make your city more
                        bike-friendly; add your favorite places and share them with your friends. It
                        will help you, your friends and also people visiting your city.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button type="button" onClick={setModal}>
                        {viewModal ? 'Close' : 'Open'}
                    </button>
                </div>
            </div>

            <Modal show={viewModal} setOpen={setModal} />
        </div>
    );
};

export default Settings;
