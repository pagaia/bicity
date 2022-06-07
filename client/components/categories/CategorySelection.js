import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chooseCategory, selectCategories } from '../../store/categorySlice';
import {
    chooseDatabase, selectDatabases
} from '../../store/featureSlice';
import { MAP_TAB_SETTINGS } from '../../utils/constants';
import SwitchField from '../form/SwitchField';
import Modal from '../Modal';

const CategorySelection = ({ show, setOpen }) => {
    const categories = useSelector(selectCategories);
    const databases = useSelector(selectDatabases);
    const dispatch = useDispatch();

    const initialValues = {
        categories: {},
        databases: {},
    };
    categories?.forEach((category) => {
        initialValues.categories[category._id] = !!category.selected;
    });

    databases?.forEach((database) => {
        initialValues.databases[database.name] = !!database.selected;
    });

    const [showTab, toggleTab] = useState(MAP_TAB_SETTINGS.CATEGORIES);

    const handleSave = (values) => {
        // update localstorage with selected categories and databases
        const { categories, databases } = values;
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('databases', JSON.stringify(databases));

        // update redux store
        dispatch(chooseCategory(categories));
        dispatch(chooseDatabase(databases));

        setOpen(false);
        // dispatch(fetchMultiFeatures({ bbox }));
        // dispatch(fetchFeaturesByBbox({ bbox, categories: cat }));
    };

    return (
        <Modal show={show}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${
                            showTab === MAP_TAB_SETTINGS.CATEGORIES ? 'active' : ''
                        }`}
                        id="categories-tab"
                        type="button"
                        role="tab"
                        aria-controls="categories"
                        aria-selected={showTab === MAP_TAB_SETTINGS.CATEGORIES}
                        onClick={() => toggleTab(MAP_TAB_SETTINGS.CATEGORIES)}>
                        Categories
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${showTab === MAP_TAB_SETTINGS.DATABASES ? 'active' : ''}`}
                        id="databases-tab"
                        type="button"
                        role="tab"
                        aria-controls="databases"
                        aria-selected={showTab === MAP_TAB_SETTINGS.DATABASES}
                        onClick={() => toggleTab(MAP_TAB_SETTINGS.DATABASES)}>
                        Databases
                    </button>
                </li>
            </ul>
            <Formik
                initialValues={initialValues}
                validate={(values) => {
                    console.debug(values);
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    handleSave(values);
                    setSubmitting(false);
                }}>
                {({ isSubmitting, errors, touched, values }) => (
                    <Form className={`mb-4`}>
                        <div className="modal-header">
                            <button
                                type="submit"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {showTab === MAP_TAB_SETTINGS.CATEGORIES && (
                                <>
                                    <h5 className="modal-title">Choose your categories</h5>
                                    {categories?.map((category, idx) => {
                                        return (
                                            <SwitchField
                                                description={category?.name}
                                                key={category?._id}
                                                id={category?._id}
                                                name={`categories.${category?._id}`}
                                                // category={category}
                                            />
                                        );
                                    })}
                                </>
                            )}

                            {showTab === MAP_TAB_SETTINGS.DATABASES && (
                                <>
                                    <h5 className="modal-title">Choose the database</h5>

                                    <SwitchField
                                        description="BiCity"
                                        id="bicity"
                                        name="databases.bicity"
                                    />
                                    <SwitchField
                                        description="Open Street Map"
                                        id="osm"
                                        name="databases.osm"
                                    />
                                </>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary">
                                Close
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default CategorySelection;
