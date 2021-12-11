import React, {useState, useEffect} from 'react';
import { LoadRestaurants } from '../services/API';
import { getDistanceBetweenTwoPoints } from '../services/geoLocation';
import { useCurrentLocation } from '../services/geoLocation';
import {MenuItem, Restaurant, RestaurantInCart} from '../services/types';
import RestaurantDetail from './restaurantDetail';
import AlertDialog from './alertDialog';

interface RestaurantsProps {
    addItemToCart: (menuItem: MenuItem) => void;
    restaurantInCart: RestaurantInCart;
    setRestaurantInCart: Function;
    restaurantIdInCart: number;
    setRestaurantIdInCart: Function;
}

const Restaurants: React.FC<RestaurantsProps> = ({
    addItemToCart,
    restaurantInCart,
    setRestaurantInCart,
    restaurantIdInCart,
    setRestaurantIdInCart
}) => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [openAlert, setOpenAlert] = React.useState(false);
    const {curLocation, error} = useCurrentLocation();

    const setRestaurantToCart = (id: number) => {
        const name = restaurants.find((restaurant) => restaurant.id === id)?.name;
        name && setRestaurantInCart({id, name});
        name && setRestaurantIdInCart(id);
    };

    const RenderRestaurants = () => (
        <ul className="restaurant-list">
            {restaurants.map((restaurant) => <RestaurantDetail
                key={restaurant.id}
                restaurant={restaurant}
                setRestaurantToCart={setRestaurantToCart}
                restaurantIdInCart={restaurantIdInCart}
                addItemToCart={addItemToCart}
                setOpenAlert={setOpenAlert}
            />)}
        </ul>
    );

    const FetchRestaurants = () => {
        LoadRestaurants().then((data) => {
            setRestaurants(data);
        });
    }

    useEffect(() => {
        if (error) {
            FetchRestaurants();
        }
    }, [error]);

    useEffect(() => {
        const fetchOrderedRestaurants = () => {
            if (curLocation) {
                LoadRestaurants().then((data) => {
                    data.sort((a: Restaurant, b: Restaurant) =>
                        getDistanceBetweenTwoPoints(curLocation, {latitude: a.latitude, longitude: a.longitude})
                        -
                        getDistanceBetweenTwoPoints(curLocation, {latitude: b.latitude, longitude: b.longitude})
                    );
                    setRestaurants(data);
                });
            }
        };
        fetchOrderedRestaurants();
    }, [curLocation]);

    return (
        <>
            <AlertDialog setOpenAlert={setOpenAlert} openAlert={openAlert} restaurantInCart={restaurantInCart} />
            {curLocation && RenderRestaurants()}
            {!curLocation && !error && <p>loading restaurants</p>}
            {error && <div><p>Location Error: {error}</p>{RenderRestaurants()}</div>}
        </>
    );
};

export default Restaurants;