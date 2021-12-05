interface Coordinates {
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

export interface FoodMenu {
    id: number;
    category: string;
    name: string;
    topping: Topping;
    price: number;
    rank: number;
}