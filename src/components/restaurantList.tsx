import React, {useState, useEffect} from 'react';
import { LoadRestaurants } from '../services/API';
import { Restaurant } from '../services/types';
import RestaurantDetail from './restaurantDetail';

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [restaurantIdInCart, setRestaurantIdInCart] = useState<number>(-1);
    useEffect(() => {
        LoadRestaurants().then((data) => setRestaurants(data));
    }, []);

    return (
        <ul className="restaurant-list">
            {restaurants.map((restaurant) => <RestaurantDetail
                key={restaurant.id}
                restaurant={restaurant}
                setRestaurantIdInCart={setRestaurantIdInCart}
                restaurantIdInCart={restaurantIdInCart}
            />)}
        </ul>
    );
};

export default Restaurants;