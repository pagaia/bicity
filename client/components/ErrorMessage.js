import { useDispatch, useSelector } from 'react-redux';
import { removeError, selectErrors } from '../store/errorSlice';

const ErrorMessage = () => {
    const errors = useSelector(selectErrors);
    const dispatch = useDispatch();

    if (!errors?.length) {
        return null;
    }
    console.log({ errors });
    const listErrors = errors.map((error) => {
        return (
            <div
                key={error.id}
                className="alert alert-danger alert-dismissible fade show"
                role="alert">
                <h4 className="alert-heading">Ops something when wrong!</h4>
                <p>Something went wrong. Please check the error message:</p>
                <hr />
                <p className="mb-0">{JSON.stringify(error)}</p>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => dispatch(removeError({ id: error.id }))}
                />
            </div>
        );
    });

    return <div id="error-message">{listErrors}</div>;
};

export default ErrorMessage;
