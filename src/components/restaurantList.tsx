import React, {useState, useEffect} from 'react';
import { LoadRestaurants } from '../services/API';
import {MenuItem, Restaurant, RestaurantInCart} from '../services/types';
import RestaurantDetail from './restaurantDetail';
import AlertDialog from "./AlertDialog";

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

    const setRestaurantToCart = (id: number) => {
        const name = restaurants.find((restaurant) => restaurant.id === id)?.name;
        name && setRestaurantInCart({id, name});
        name && setRestaurantIdInCart(id);
    };

    useEffect(() => {
        LoadRestaurants().then((data) => setRestaurants(data));
    }, []);

    return (
        <>
            <AlertDialog setOpenAlert={setOpenAlert} openAlert={openAlert} restaurantInCart={restaurantInCart} />
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
        </>
    );
};

export default Restaurants;