import PropTypes from 'prop-types';

const Modal = ({ children, show }) => {
    return (
        <div className={`modal modal-fullscreen ${show ? 'show' : ''}`} tabindex="-1">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">{children}</div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    show:  PropTypes.bool,
    children: PropTypes.node,
};
export default Modal;
