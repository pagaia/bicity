import dynamic from 'next/dynamic';

const FindPositionNoSSR = ({ position, setPosition }) => {
    const WrapperMap = dynamic(() => import('./FindMapContainer'), {
        ssr: false,
    });

    return (
        <div id="map" className='mb-5'>
            <WrapperMap position={position} setPosition={setPosition} />
        </div>
    );
};

export default FindPositionNoSSR;
