import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ExternalLink from '../ExternalLink';
import RandomPicture from '../ui/RandomPicture';
import Spinner from '../ui/Spinner';
import Vote from '../Vote';
import { usePosition } from '../../hooks/usePosition';
import Favorite from './Favorite';
import Direction from './Direction';
import Phone from './FeatureProps/Phone';

const FeatureDetails = (props) => {
    const { featureId } = props;

    const { user } = useAuth();
    const userId = user?.profile?._id;
    const [feature, setFeature] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(true);
    const { position } = usePosition();

    console.debug({ position, user });
    useEffect(() => {
        const fetchFeatureDetails = async () => {
            console.debug({ featureId });
            if (featureId) {
                const response = await axios(`/api/feature/${featureId}`);
                const { data } = response;
                setFeature(data);
                setFetching(false);
            }
        };
        fetchFeatureDetails();
    }, [featureId]);

    if (!featureId) {
        return null;
    }

    if (fetching) {
        return (
            <div className="container">
                <Spinner />
            </div>
        );
    }
    const lat = feature.geometry.coordinates[1];
    const long = feature.geometry.coordinates[0];

    return (
        <div className="container">
            <div className="card">
                <RandomPicture />
                <div className="card-body">
                    <h5 className="card-title">{feature?.properties?.name}</h5>
                    <Favorite featureId={featureId} userId={userId} />
                    <div className="card-text element">
                        <dl className="row">
                            {Object.keys(feature?.properties)?.map((key) => {
                                if (key === 'name') {
                                    return null;
                                }

                                if (key === 'phone') {
                                    return (
                                        <Phone
                                            key={key}
                                            name={key}
                                            value={feature?.properties[key]}
                                        />
                                    );
                                }
                                return (
                                    <Fragment key={key}>
                                        <dt className="col-sm-3">{key}</dt>
                                        <dd className="col-sm-9">{feature?.properties[key]}</dd>
                                    </Fragment>
                                );
                            })}

                            <Direction lat={lat} long={long} />
                            <Vote featureId={featureId} userId={userId} />
                        </dl>
                    </div>
                </div>
                {/* <div className="card-footer">
                    <small className="text-muted">Last update: {feature.updatedAt}</small>
                </div> */}
            </div>
        </div>
    );
};

export default FeatureDetails;
