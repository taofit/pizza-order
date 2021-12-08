const restaurantUrl = 'https://private-anon-b7be8a525e-pizzaapp.apiary-mock.com/restaurants/';
const orderUrl = `https://private-anon-d499ee723f-pizzaapp.apiary-mock.com/orders/`;

export const LoadRestaurants = async () => {
    const response = await fetch(restaurantUrl, {
        method: 'GET'
    });
    return await response.json();
}

export const LoadRestaurantMenu = async (restaurantId: number) => {
    const restaurantMenu = `https://private-anon-b7be8a525e-pizzaapp.apiary-mock.com/restaurants/${restaurantId}/menu?category=Pizza&orderBy=rank`;
    const response = await fetch(restaurantMenu, {
        method: 'GET'
    });
    return await response.json();
}
export const PlaceOrder = async (body: {}) => {
    const response = await fetch(orderUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return await response.json();
}
