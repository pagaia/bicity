import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

export default function Home() {
    const MapWithNoSSR = dynamic(() => import('../components/map/MainMap.js'), {
        ssr: false,
    });

    return (
        <Fragment>
            <div id="map">
                <MapWithNoSSR />
            </div>
            <div id="list"></div>
        </Fragment>
    );
}
