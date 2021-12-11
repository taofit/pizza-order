export interface Coordinate {
    longitude: number;
    latitude: number;
}
type Topping = string[];

export interface Restaurant {
    address1: string;
    address2: string;
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

export interface RestaurantInCart {
    id: number;
    name: string;
}

export interface MenuItem {
    id: number;
    category: string;
    name: string;
    topping: Topping;
    price: number;
    rank: number;
}

export interface MenuItemWithCount {
    menuItem: MenuItem;
    quantity: number;
}

export interface MenuItemOrder {
    menuItemId: number;
    quantity: number;
}

export type CartOrder = MenuItemOrder[];