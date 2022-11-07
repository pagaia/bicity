import L from 'leaflet';
import { CATEGORY_ICON } from './constants';

const buildIconMap = ({ category, className }) => {
    return L.divIcon({
        html: `<i class="fas ${CATEGORY_ICON[category] || 'fa-map-pin'} fa-2x"></i>`,
        iconSize: [20, 20],
        className,
    });
};

export default buildIconMap;
