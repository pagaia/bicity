const ErrorMessage = ({ message }) => {
    if (!message) {
        return null;
    }
    return (
        <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Ops something when wrong!</h4>
            <p>Something went wrong. Please check the error message:</p>
            <hr />
            <p className="mb-0">{message.message.message}</p>
        </div>
    );
};

export default ErrorMessage;
