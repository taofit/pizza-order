import {useEffect, useState} from 'react';
import {Coordinate} from "./types";

//code reference: https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
export const getDistanceBetweenTwoPoints = (cord1: Coordinate, cord2: Coordinate) => {
    if (cord1.latitude === cord2.latitude && cord1.longitude === cord2.longitude) {
        return 0;
    }

    const radlat1 = (Math.PI * cord1.latitude) / 180;
    const radlat2 = (Math.PI * cord2.latitude) / 180;

    const theta = cord1.longitude - cord2.longitude;
    const radtheta = (Math.PI * theta) / 180;

    let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    if (dist > 1) {
        dist = 1;
    }

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344; //convert miles to km

    return dist;
};

export const useCurrentLocation = () => {
    const [error, setError] = useState<string>('');
    const [location, setLocation] = useState<Coordinate>();

    const handleSuccess = (position: GeolocationPosition) => {
        let currentPos: Coordinate = {latitude: position.coords.latitude, longitude: position.coords.longitude};
        setLocation(currentPos);
    }

    const handleError = (error: GeolocationPositionError) => setError(error.message);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported.");
            return;
        }
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }, []);

    return { curLocation: location, error };
};