import { MenuItem, MenuItemWithCount } from "../services/types";
import {Button} from "react-bootstrap";

interface Props {
    items: MenuItemWithCount[];
    addItem: (menuItem: MenuItem) => void;
    removeItem: (id: number) => void;
}

const Cart: React.FC<Props> = ({items, addItem, removeItem}) => {
    return (
        <div>
            <div className="cart-total">
                <h3>Shopping Cart</h3>
                {items.length > 0 ? <h4>Total:</h4> : null}
            </div>
            {items.length === 0 ? <p className='emptyMsg'>Cart is empty.</p> : null}
            {items.map((item: MenuItemWithCount)=> (
                <div key={item.menuItem.name}>
                    <h4>{item.menuItem.name}</h4>
                    <div className='itemDetail'>
                        <div>
                            Price:
                            {item.menuItem.price}
                        </div>
                        <div>
                            Total:
                            {item.menuItem.price * item.quantity}
                        </div>
                    </div>
                    <div className='itemButton'>
                        <Button  onClick={() => removeItem(item.menuItem.id)}>-</Button>
                        <span>{item.quantity}</span>
                        <Button  onClick={() => addItem(item.menuItem)}>+</Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cart;
