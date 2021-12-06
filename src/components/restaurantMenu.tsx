import React, {useEffect, useState} from "react";
import {FoodMenu, Cart, MenuItem} from "../services/types";
import {LoadRestaurantMenu} from "../services/API";
import {Button, Collapse} from "react-bootstrap";
import Dialog from '@mui/material/Dialog';

const add_basket_icon = './svg/add_basket_icon.svg';

interface MenuProps {
    id: number;
    restaurantIdInCart: number;
    setRestaurantIdInCart: Function;
}
type MenusCategoryType = {
  [key: string]: FoodMenu[]
};


const Menu: React.FC<MenuProps> = ({id, restaurantIdInCart, setRestaurantIdInCart}: MenuProps) => {
    const [open, setOpen] = useState(false);
    const [menus, setMenus] = useState<FoodMenu[]>([]);
    const [menusCategory, setMenusCategory] = useState<MenusCategoryType>({});
    const [cart, setCart] = useState<Cart>([]);
    const collapseId = `collapse-menu-${id}`;

    const isAnotherRestaurant = (restaurantId: number) => restaurantIdInCart !== -1 && restaurantIdInCart !== restaurantId;

    const addToCart = (menuItemId: number) => {
        console.log(menuItemId, id); //id is restaurant id
        if (isAnotherRestaurant(id)) {
            console.log('cannot choose another restaurant');
            return;
        }
        setRestaurantIdInCart(id);
        const newMenuItem = {menuItemId, quantity: 1};
        const menuItemIndex = cart.findIndex((menuItem) => menuItem.menuItemId === menuItemId)
        if (menuItemIndex === -1) {
            setCart([...cart, newMenuItem]);
        } else {
            cart[menuItemIndex] = {...cart[menuItemIndex], quantity: cart[menuItemIndex]['quantity'] + 1};
            setCart(cart)
        }
    };

    const rearrangeMenuByCategory = () => {
        const menusCate = menus.reduce((acc: MenusCategoryType, cur) => {
            const category = cur.category;
            return {
                ...acc,
                [category]: [...(acc[category] || []), cur]
            }
        }, {});
        setMenusCategory(menusCate);
    };

    useEffect(() => {
        LoadRestaurantMenu(id).then((menus: FoodMenu[]) => {
            setMenus(menus);
        });
    }, []);

    useEffect(() => {
        if (!!menus.length) {
            rearrangeMenuByCategory();
        }
    }, [menus]);

    return (
        <>
            <Button
                className="toggle-button"
                onClick={() => setOpen(!open)}
                aria-controls={collapseId}
                aria-expanded={open}
            >
                see menu
            </Button>
            <Collapse in={open}>
                <div id={collapseId}>
                    <ul>
                        {
                            Object.keys(menusCategory).map(
                                (category: string) => (
                                    <li key={category}>
                                        <h3>{category}</h3>
                                        <ul>
                                            {menusCategory[category].map((item) => (
                                                    <li key={item.id} className="menu-list-item">
                                                        <span>{item.name}, {item.price} kronor, {item.rank && `Rank: ${item.rank}`}</span>
                                                        <img src={add_basket_icon} className="add-to-order" onClick={() => addToCart(item.id)}/>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
            </Collapse>
        </>
    )
};

export default Menu;
