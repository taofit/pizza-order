import React, {useEffect, useState} from 'react';
import {Restaurant, MenuItem} from '../services/types';
import Menu from './restaurantMenu';

interface RestaurantProps {
    restaurant: Restaurant;
    restaurantIdInCart: number;
    setRestaurantToCart: Function;
    addItemToCart: (menuItem: MenuItem) => void;
    setOpenAlert: (open: boolean) => void;
}


const RestaurantDetail: React.FC<RestaurantProps> = ({restaurant, restaurantIdInCart, setRestaurantToCart, addItemToCart, setOpenAlert}: RestaurantProps) => {
    return <li key={restaurant.id}>
        <h4>{restaurant.name}</h4>
        <p>{restaurant.address1} {restaurant.address2}</p>
        <Menu
            restaurantId={restaurant.id}
            restaurantIdInCart={restaurantIdInCart}
            setRestaurantToCart={setRestaurantToCart}
            addItemToCart={addItemToCart}
            setOpenAlert={setOpenAlert}
        />
    </li>
};

export default RestaurantDetail;