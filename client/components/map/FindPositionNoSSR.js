import dynamic from 'next/dynamic';

const FindPositionNoSSR = ({ position, setPosition }) => {
    const WrapperMap = dynamic(() => import('./FindMapContainer'), {
        ssr: false,
    });

    return (
        <div id="map">
            <WrapperMap position={position} setPosition={setPosition} />
        </div>
    );
};

export default FindPositionNoSSR;
