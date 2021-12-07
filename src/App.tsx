import React, {useState, useEffect} from 'react';
import Drawer from "@mui/material/Drawer";
import Cart from './components/cart';
import CartBadge from './components/cartBadge';
import { MenuItem, MenuItemWithCount } from './services/types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo.svg';
import Restaurants from './components/restaurantList';

const Header = () => <header className="App-header">
    <img src={logo} className="App-logo" alt="logo"/>
    <p>Order your pizza here...</p>
</header>

function App() {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<MenuItemWithCount[]>([]);

    const addItemToCart = (selectedMenuItem: MenuItem) => {
        const newMenuItem = {menuItem: selectedMenuItem, quantity: 1};
        const menuItemIndex = cartItems.findIndex((cartMenuItem) => cartMenuItem.menuItem.id === selectedMenuItem.id)
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

    };

    const toggleDrawer = () => {
        setCartOpen(!cartOpen);
    };

    return (
        <div className="App">
            <Header />
            <Drawer anchor="right" open={cartOpen} onClose={toggleDrawer}>
                <Cart items={cartItems} addItem={addItemToCart} removeItem={removeItemFromCart} />
            </Drawer>
            <CartBadge toggleDrawer={toggleDrawer} getTotalItems={getTotalItems} cartItems={cartItems}/>
            <Restaurants addItemToCart={addItemToCart}/>
        </div>
    );
}

export default App;
