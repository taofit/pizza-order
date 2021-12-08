import React, {useEffect, useState} from 'react';
import {MenuItem} from '../services/types';
import {LoadRestaurantMenu} from '../services/API';
import {Button, Collapse} from 'react-bootstrap';
import Tooltip from '@mui/material/Tooltip';

const ADD_BASKET_ICON = './svg/add_basket_icon.svg';

interface MenuProps {
    restaurantId: number;
    restaurantIdInCart: number;
    setRestaurantToCart: Function;
    addItemToCart: (menuItem: MenuItem) => void;
    setOpenAlert: (open: boolean) => void;
}
type MenusCategoryType = {
    [key: string]: MenuItem[]
};


const Menu: React.FC<MenuProps> = ({restaurantId, restaurantIdInCart, setRestaurantToCart, addItemToCart, setOpenAlert}: MenuProps) => {
    const [open, setOpen] = useState(false);
    const [menus, setMenus] = useState<MenuItem[]>([]);
    const [menusCategory, setMenusCategory] = useState<MenusCategoryType>({});
    const collapseId = `collapse-menu-${restaurantId}`;

    const isAnotherRestaurant = (restaurantId: number) => restaurantIdInCart !== -1 && restaurantIdInCart !== restaurantId;

    const addToCart = (menuItem: MenuItem) => {
        if (isAnotherRestaurant(restaurantId)) {
            setOpenAlert(true);
            return;
        }
        if (restaurantId !== restaurantIdInCart) {
            setRestaurantToCart(restaurantId);
        }
        addItemToCart(menuItem);
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
        LoadRestaurantMenu(restaurantId).then((menus: MenuItem[]) => {
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
                                                        <Tooltip title="add to cart" placement="right-end">
                                                            <img src={ADD_BASKET_ICON} className="add-to-order" onClick={() => addToCart(item)}/>
                                                        </Tooltip>
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
