import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { chooseCategory, selectCategories } from '../store/categorySlice';
import SwitchField from './form/SwitchField';

const Modal = ({ show, setOpen }) => {
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();

    const initialValues = {};
    categories?.forEach((category) => {
        initialValues[category._id] = !!category.selected;
    });
    const handleSave = (values) => {
        // update localstorage with selected categories
        localStorage.setItem('categories', JSON.stringify(values));

        // update redux store
        dispatch(chooseCategory(values));
        setOpen(false);
    };
    return (
        <>
            <div className={`modal modal-fullscreen ${show ? 'show' : ''}`} tabindex="-1">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <Formik
                            initialValues={initialValues}
                            validate={(values) => {
                                console.log(values);
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                                setSubmitting(true);
                                handleSave(values);
                                setSubmitting(false);
                            }}>
                            {({ isSubmitting, errors, touched, values }) => (
                                <Form className={`mb-4`}>
                                    <div className="modal-header">
                                        <h5 className="modal-title">Choose your categories</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            onClick={() => setOpen(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        {categories?.map((category, idx) => {
                                         return (
                                                <SwitchField
                                                    description={category?.name}
                                                    key={category?._id}
                                                    id={category?._id}
                                                    name={category?._id}
                                                    category={category}
                                                />
                                            );
                                        })}
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                            onClick={() => setOpen(false)}>
                                            Close
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn btn-primary">
                                            Save changes
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
