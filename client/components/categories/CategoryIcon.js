import L from 'leaflet';

const CATEGORY_ICON = {
    bar: 'fa-glass-martini',
    biergarten: 'fa-beer',
    cafe: 'fa-coffee',
    fast_food: 'fa-cheeseburger',
    food_court: 'fa-utensils',
    ice_cream: 'fa-ice-cream',
    pub: 'fa-wine-glass',
    restaurant: 'fa-utensils',
    college: 'fa-graduation-cap',
    kindergarte: 'fa-baby',
    language_school: 'fa-language',
    library: 'fa-book-open',
    music_school: 'fa-clarinet',
    school: 'fa-school',
    university: 'fa-university',
    bicycle_parking: 'fa-parking',
    bicycle_repair_station: 'fa-tools',
};

const buildIcon = ({ category, className }) => {
    return L.divIcon({
        html: `<i class="fas ${CATEGORY_ICON[category] || 'fa-map-pin'} fa-2x"></i>`,
        iconSize: [20, 20],
        className,
    });
};

export default buildIcon;
