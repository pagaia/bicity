import { useDispatch, useSelector } from 'react-redux';
import { removeError, selectErrors } from '../store/errorSlice';
import ReactTimeAgo from 'react-time-ago';

const ErrorMessage = () => {
    const errors = useSelector(selectErrors);
    const dispatch = useDispatch();

    if (!errors?.length) {
        return null;
    }
    console.debug({ errors });
    const listErrors = errors.map((error) => {
        return (
            <div
                className="toast show"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                key={error.id}>
                <div className="toast-header">
                    <strong className="me-auto">Error</strong>
                    <small>
                        <ReactTimeAgo date={new Date(error.time)} locale="en-US" />
                    </small>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                        onClick={() => dispatch(removeError({ id: error.id }))}></button>
                </div>
                <div className="toast-body">{error.message}</div>
            </div>
        );
    });

    return <div id="error-message">{listErrors}</div>;
};

export default ErrorMessage;
