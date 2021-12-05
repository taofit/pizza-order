import React, {useEffect, useState} from 'react';
import {Restaurant, FoodMenu} from '../services/types';
import Menu from './restaurantMenu';

interface RestaurantProps {
    restaurant: Restaurant;
}


const RestaurantDetail: React.FC<RestaurantProps> = ({restaurant}: RestaurantProps) => {
    return <li key={restaurant.id}>
        <h4>{restaurant.name}</h4>
        <p>{restaurant.address1} {restaurant.address2}</p>
        <Menu id={restaurant.id}/>
    </li>
};

export default RestaurantDetail;