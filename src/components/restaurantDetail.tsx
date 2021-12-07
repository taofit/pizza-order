import React, {useEffect, useState} from 'react';
import {Restaurant, MenuItem} from '../services/types';
import Menu from './restaurantMenu';

interface RestaurantProps {
    restaurant: Restaurant;
    restaurantIdInCart: number;
    setRestaurantIdInCart: Function;
    addItemToCart: (menuItem: MenuItem) => void;
}


const RestaurantDetail: React.FC<RestaurantProps> = ({restaurant, restaurantIdInCart, setRestaurantIdInCart, addItemToCart}: RestaurantProps) => {
    return <li key={restaurant.id}>
        <h4>{restaurant.name}</h4>
        <p>{restaurant.address1} {restaurant.address2}</p>
        <Menu
            id={restaurant.id}
            restaurantIdInCart={restaurantIdInCart}
            setRestaurantIdInCart={setRestaurantIdInCart}
            addItemToCart={addItemToCart}
        />
    </li>
};

export default RestaurantDetail;