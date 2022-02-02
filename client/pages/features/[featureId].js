import axios from 'axios';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import ExternalLink from '../../components/ExternalLink';
import RandomPicture from '../../components/ui/RandomPicture';
import Spinner from '../../components/ui/Spinner';
import { useAuth } from '../../hooks/useAuth';
import { usePosition } from '../../hooks/usePosition';

const FeatureDetails = () => {
    const router = useRouter();
    const { featureId } = router.query;

    const { user } = useAuth();
    const [feature, setFeature] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(true);
    const { position } = usePosition();

    console.log({ position });
    useEffect(async () => {
        console.log({ featureId });
        if (featureId) {
             const response = await axios(`/api/feature/${featureId}`, {
                headers: { Authorization: user?.authorization },
            });
            const { data } = response;
            setFeature(data);
            setFetching(false);
        }
    }, [featureId]);

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
                    <div className="card-text">
                        <dl className="row">
                            {Object.keys(feature?.properties)?.map((key) => {
                                if (key === 'name') {
                                    return null;
                                }

                                if (key === 'phone') {
                                    return (
                                        <Fragment key={key}>
                                            <dt className="col-sm-3">{key}</dt>
                                            <dd className="col-sm-9">
                                                <a href={`tel:${feature?.properties[key]}`}>
                                                    {feature?.properties[key]}
                                                </a>
                                            </dd>
                                        </Fragment>
                                    );
                                }
                                return (
                                    <Fragment key={key}>
                                        <dt className="col-sm-3">{key}</dt>
                                        <dd className="col-sm-9">{feature?.properties[key]}</dd>
                                    </Fragment>
                                );
                            })}

                            <div className="col-sm-12">
                                <ExternalLink
                                    url={`https://www.google.com/maps/dir/?api=1&origin=${position.latitude},${position.longitude}&destination=${lat},${long}&travelmode=bicycling`}>
                                    Get directions
                                </ExternalLink>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="card-footer">
                    <small className="text-muted">Last update: {feature.updatedAt}</small>
                </div>
            </div>
        </div>
    );
};

export default FeatureDetails;
