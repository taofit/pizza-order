export const LoadRestaurants = async () => {
    const restaurantUrl = 'https://private-anon-b7be8a525e-pizzaapp.apiary-mock.com/restaurants/';
    return fetchCall(restaurantUrl, {method: 'GET'});
};

export const LoadRestaurantMenu = async (restaurantId: number) => {
    const restaurantMenuUrl = `https://private-anon-b7be8a525e-pizzaapp.apiary-mock.com/restaurants/${restaurantId}/menu?category=Pizza&orderBy=rank`;
    return fetchCall(restaurantMenuUrl, {method: 'GET'});
};

export const PlaceOrder = async (body: {}) => {
    const orderUrl = `https://private-anon-d499ee723f-pizzaapp.apiary-mock.com/orders/`;
    return fetchCall(orderUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
};

export const ReadOrder = async (id: number) => {
    const orderUrl = `https://private-anon-42dc3b7718-pizzaapp.apiary-mock.com/orders/${id}`;
    return fetchCall(orderUrl, {method: 'GET'});
};

const fetchCall = async (url: string, body = {}) => {
    const response = await fetch(url, {
        ...body
    });
    return await response.json();
};