import { Fragment } from 'react';
import RandomPicture from '../ui/RandomPicture';
import Direction from './Direction';
import Phone from './FeatureProps/Phone';
import Website from './FeatureProps/Website';

const PHONE_REG = /phone/;
const WEBSITE_REG = /website/;

const OsmFeatureItem = ({ item, onClick }) => {
    if (!item) {
        return null;
    }
    const { tags } = item;
    const { lat, lon } = item;

    return (
        <div className="element shadow-sm mb-3 bg-body rounded" id={item.id} key={item.id}>
            <RandomPicture category={item?.tags?.amenity ?? item?.tags?.emergency} />

            <dl className="row">
                <dt className="col-sm-3">Amenity:</dt>
                <dd className="col-sm-9">{tags?.amenity}</dd>

                {Object.keys(tags).map((tag, idx) => {
                    if (tag === 'amenity') {
                        return null;
                    }
                    const value = tags?.[tag];

                    if (PHONE_REG.test(tag)) {
                        return <Phone value={value} />;
                    }
                    if (WEBSITE_REG.test(tag)) {
                        return <Website value={value} />;
                    }

                    return (
                        <Fragment key={idx}>
                            <dt className="col-sm-3">{tag}</dt>
                            <dd className="col-sm-9">{value}</dd>
                        </Fragment>
                    );
                })}

                <Direction lat={lat} long={lon} />
            </dl>
        </div>
    );
};

export default OsmFeatureItem;
