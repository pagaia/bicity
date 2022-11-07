import { useEffect, useState } from 'react';
import Image from 'next/image';
import ExternalLink from '../ExternalLink';
import PropTypes from 'prop-types';

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const randomSearchString = () => {
    const topic = [
        'city night',
        'city night aerial',
        'landscape',
        'travel',
        'red',
        'blue',
        'yellow',
        'white',
        'black',
        'orange',
        'turquoise',
        'violet',
        'pink',
        'brown',
        'white',
        'Sea Life',
        'By The Sea',
        'Stay At Home',
        'Seascape',
        'Sea',
        'Maximalism',
        'Monochrome',
        'Background',
        'Colorful',
        'Colorful Background',
        'Fruity',
        'Pc Wallpapers',
        'Space Wallpaper',
        'Space',
        'Phone Wallpaper',
        'Iphone Wallpaper',
        'Ride your bicyle',
    ];
    const index = randomNumber(0, topic.length);
    console.debug({ index });
    return topic[index];
};

const RandomPicture = ({ category }) => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(true);

    const categoryText = category?.replace(/_/g, ' ');
    useEffect(() => {
        const fetchImage = async () => {
            const response = await fetch(
                `https://api.pexels.com/v1/search?per_page=1&query=${categoryText}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: process.env.NEXT_PUBLIC_PEXEL_TOKEN,
                    },
                }
            );
            const data = await response.json();
            if (response.ok) {
                setImage(data?.photos?.[0]);
            } else {
                setError(data);
            }
            setFetching(false);
        };

        fetchImage();
    }, []);

    if (!image) {
        return null;
    }
    return (
        <figure>
            <div className="image-container">
                <Image src={image?.src?.large} className="image" alt={image?.alt} layout="fill" />
            </div>
            <figcaption>
                <ExternalLink url={image?.url}>{`Photo by ${image.photographer}`}</ExternalLink>
            </figcaption>
        </figure>
    );
};

RandomPicture.propTypes = {
    category: PropTypes.string,
};
export default RandomPicture;
