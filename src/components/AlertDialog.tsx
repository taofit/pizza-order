import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {RestaurantInCart} from "../services/types";

//code is borrowed from: https://codesandbox.io/s/00y2v?file=/demo.tsx
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogSlide {
    setOpenAlert: Function;
    openAlert: boolean;
    restaurantInCart: RestaurantInCart
}

const AlertDialog: React.FC<AlertDialogSlide> = ({setOpenAlert, openAlert, restaurantInCart}: AlertDialogSlide) => (
    <div>
        <Dialog
            open={openAlert}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setOpenAlert(false)}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Notice: cannot choose items from two different restaurants"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    You have chosen some items in restaurant "{restaurantInCart.name}", you cannot choose items from this restaurant.
                    So you need to cancel all the items from restaurant {restaurantInCart.name} to be able to choose item from another restaurant.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenAlert(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    </div>
);

export default AlertDialog;