import React, {useState, useEffect} from 'react';
import Drawer from "@mui/material/Drawer";
import Cart from './cart';
import CartBadge from './cartBadge';
import {MenuItem, MenuItemWithCount, RestaurantInCart} from '../services/types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Restaurants from './restaurantList';

const INIT_RESTAURANT_IN_CART = {id: -1, name: ''};

function Main() {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<MenuItemWithCount[]>([]);
    const [restaurantInCart, setRestaurantInCart] = React.useState<RestaurantInCart>(INIT_RESTAURANT_IN_CART);
    const [restaurantIdInCart, setRestaurantIdInCart] = useState<number>(-1);

    const addItemToCart = (selectedMenuItem: MenuItem) => {
        const newMenuItem = {menuItem: selectedMenuItem, quantity: 1};
        const menuItemIndex = cartItems.findIndex((cartMenuItem) => cartMenuItem.menuItem.id === selectedMenuItem.id);
        if (menuItemIndex === -1) {
            setCartItems([...cartItems, newMenuItem]);
        } else {
            cartItems[menuItemIndex] = {...cartItems[menuItemIndex], quantity: cartItems[menuItemIndex]['quantity'] + 1};
            setCartItems([...cartItems])
        }
    };

    const getTotalItems = (items: MenuItemWithCount[]) => (
        items.reduce((total:number, item) => total + item.quantity, 0)
    );

    const removeItemFromCart = (id: number) => {
        const menuItemIndex = cartItems.findIndex((cartMenuItem) => cartMenuItem.menuItem.id === id);

        if (menuItemIndex !== -1) {
            const curItemQuantity = cartItems[menuItemIndex]['quantity'];
            const newItemQuantity = curItemQuantity - 1;
            if (newItemQuantity === 0) {
                setCartItems([...cartItems].filter(item => item.menuItem.id !== id));
            } else {
                cartItems[menuItemIndex] = {...cartItems[menuItemIndex], quantity: newItemQuantity}
                setCartItems([...cartItems]);
            }
        }
    };

    const toggleDrawer = () => {
        setCartOpen(!cartOpen);
    };

    useEffect(() => {
        if(cartItems.length === 0) {
            setRestaurantInCart(INIT_RESTAURANT_IN_CART);
            setRestaurantIdInCart(-1);
        }
    }, [cartItems]);

    return (
        <div>
            <Drawer anchor="right" open={cartOpen} onClose={toggleDrawer}>
                <Cart
                    items={cartItems}
                    addItem={addItemToCart}
                    removeItem={removeItemFromCart}
                    restaurantInCart={restaurantInCart}
                />
            </Drawer>
            <CartBadge toggleDrawer={toggleDrawer} getTotalItems={getTotalItems} cartItems={cartItems}/>
            <Restaurants
                addItemToCart={addItemToCart}
                restaurantInCart={restaurantInCart}
                setRestaurantInCart={setRestaurantInCart}
                restaurantIdInCart={restaurantIdInCart}
                setRestaurantIdInCart={setRestaurantIdInCart}
            />
        </div>
    );
}

export default Main;
