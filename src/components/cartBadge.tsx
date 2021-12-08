import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {MenuItemWithCount} from "../services/types";

;

interface CartBadgeProps {
    toggleDrawer: () => void;
    getTotalItems: (cartItems: MenuItemWithCount[]) => number;
    cartItems: MenuItemWithCount[];
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const CartBadge:React.FC<CartBadgeProps> = ({toggleDrawer, getTotalItems, cartItems}) => (
    <IconButton aria-label="cart" className="cart-icon" onClick={toggleDrawer}>
        <StyledBadge badgeContent={getTotalItems(cartItems)} color="secondary">
            <ShoppingCartIcon />
        </StyledBadge>
    </IconButton>
);

export default CartBadge;