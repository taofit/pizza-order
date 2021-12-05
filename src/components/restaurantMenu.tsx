import React, {useEffect, useState, MouseEvent} from "react";
import {FoodMenu} from "../services/types";
import {LoadRestaurantMenu} from "../services/API";
import {Button, Collapse} from "react-bootstrap";

const add_basket_icon = './svg/add_basket_icon.svg';

interface MenuProps {
    id: number;
}
type MenusCategoryType = {
  [key: string]: FoodMenu[]
};

const Menu: React.FC<MenuProps> = ({id}: MenuProps) => {
    const [open, setOpen] = useState(false);
    const [menus, setMenus] = useState<FoodMenu[]>([]);
    const [menusCategory, setMenusCategory] = useState<MenusCategoryType>({});
    const collapseId = `collapse-menu-${id}`;

    const addToOrder = (menuId: number) => {
        console.log(menuId, id);//id is restaurant id
    };

    useEffect(() => {
        LoadRestaurantMenu(id).then((menus: FoodMenu[]) => {
            setMenus(menus);
        });
    }, []);

    useEffect(() => {
        if (menus.length === 0) return;
        const menusCate = menus.reduce((acc: MenusCategoryType, cur) => {
            const category = cur.category;
            return {
                ...acc,
                [category]: [...(acc[category] || []), cur]
            }
        }, {});
        setMenusCategory(menusCate);
        console.log(menusCategory);
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
                                                        <img src={add_basket_icon} className="add-to-order" onClick={() => addToOrder(item.id)}/>
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
