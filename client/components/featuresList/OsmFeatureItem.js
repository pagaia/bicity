import { Fragment } from "react";

const OsmFeatureItem = ({ item, onClick }) => {
    const { tags } = item;
    const { lat, lon } = item;

    return (
        <div
            className="element shadow-sm p-3 mb-3 bg-body rounded"
            id={item.id}
            onClick={() => onClick({ coordinates: [lon, lat] })}
            key={item.id}>
            <dl className="row">
                <dt className="col-sm-3">Amenity:</dt>
                <dd className="col-sm-9">{tags?.amenity}</dd>

                {Object.keys(tags).map((tag, idx) => {
                    if (tag === 'amenity') {
                        return null;
                    }
                    const value = tags?.[tag];
                    return (
                        <Fragment key={idx}>
                            <dt className="col-sm-3">{tag}</dt>
                            <dd className="col-sm-9">{value}</dd>
                        </Fragment>
                    );
                })}
                {/* <div className="col-sm-12">
                    <ExternalLink
                        url={`https://www.google.com/maps/dir/?api=1&origin=${position?.latitude},${position?.longitude}&destination=${lat},${lon}&travelmode=bicycling`}>
                        Get directions
                    </ExternalLink>
                </div> */}
            </dl>
        </div>
    );
};

export default OsmFeatureItem;
