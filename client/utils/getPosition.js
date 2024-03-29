const getCurrentPosition = () => {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    function success(pos) {
        var crd = pos.coords;

        console.debug('Your current position is:');
        console.debug(`Latitude : ${crd.latitude}`);
        console.debug(`Longitude: ${crd.longitude}`);
        console.debug(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
};

export default getCurrentPosition;
