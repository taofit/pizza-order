const restaurantUrl = 'https://private-anon-b7be8a525e-pizzaapp.apiary-mock.com/restaurants/';

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
