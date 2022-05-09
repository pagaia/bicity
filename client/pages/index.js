import dynamic from 'next/dynamic';

export default function Home() {
    const MapWithNoSSR = dynamic(() => import('../components/map/MainMap.js'), {
        ssr: false,
    });

    return (
        <div id="map">
            <MapWithNoSSR />
        </div>
    );
}
