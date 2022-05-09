import { useEffect, useState } from 'react';

export const ScreenSize = () => {
    const [screenSize, setDimension] = useState({
        dynamicWidth: typeof window !== 'undefined' ? window?.innerWidth : null,
        dynamicHeight: typeof window !== 'undefined' ? window?.innerHeight : null,
    });

    const getDimension = () => {
        setDimension({
            dynamicWidth: window?.innerWidth,
            dynamicHeight: window?.innerHeight,
        });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', getDimension);

            return () => {
                window.removeEventListener('resize', getDimension);
            };
        }
    }, [screenSize]);

    if (process.env.NODE_ENV === 'production') {
        return null;
    }
    return (
        <div className="screen-size">
            {screenSize?.dynamicWidth}/{screenSize?.dynamicHeight}
        </div>
    );
};
