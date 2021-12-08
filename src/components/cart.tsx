import {MenuItem, MenuItemWithCount, RestaurantInCart, CartOrder} from "../services/types";
import {Button} from "react-bootstrap";
import {PlaceOrder} from "../services/API";

interface Props {
    items: MenuItemWithCount[];
    addItem: (menuItem: MenuItem) => void;
    removeItem: (id: number) => void;
    restaurantInCart: RestaurantInCart;
}

const CURRENCY = 'kr';

const getTotalPrice = (items: MenuItemWithCount[]) => items.reduce(
    (acc: number, item) => acc + item.quantity * item.menuItem.price, 0
);

const Cart: React.FC<Props> = ({items, addItem, removeItem, restaurantInCart}) => {
    console.log(items);
    const playOrder = () => {
        const cart = items.reduce((acc: CartOrder, cur) => {
            return [...acc, {menuItemId: cur.menuItem.id, quantity: cur.quantity}]
        }, []);
        const restuarantId = restaurantInCart.id;
        PlaceOrder({cart: cart, restuarantId}).then((data) => console.log(data));
    }

    return (
        <div className="cart">
            <div className="cart-total">
                <h3>You order</h3>
                {!!items.length && <div><h4 className="total-price">Total:</h4> {getTotalPrice(items)} {CURRENCY}</div>}
            </div>
            {items.length === 0 && <p className='empty-msg'>Cart is empty.</p>}
            {restaurantInCart.name && <div><h4 className="restaurant-title">Restaurant:</h4> {restaurantInCart.name}</div>}
            {!!items.length && <h4>Food list</h4>}
            {items.map((item: MenuItemWithCount)=> (
                <div key={item.menuItem.name} className="food-list">
                    <h4>{item.menuItem.name}</h4>
                    <div className='itemDetail'>
                        <div>
                            Price:
                            {item.menuItem.price} {CURRENCY}
                        </div>
                        <div>
                            Total:
                            {item.menuItem.price * item.quantity} {CURRENCY}
                        </div>
                    </div>
                    <div className='item-button'>
                        <Button variant="secondary" onClick={() => removeItem(item.menuItem.id)}>-</Button>
                        <span>{item.quantity}</span>
                        <Button variant="primary" onClick={() => addItem(item.menuItem)}>+</Button>
                    </div>
                </div>
            ))}
            {!!items.length && <Button variant="success" onClick={playOrder}>Pay</Button>}
        </div>
    );
};

export default Cart;
