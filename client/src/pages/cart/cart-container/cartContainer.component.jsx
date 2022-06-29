import React, { useContext } from 'react';
import { CartContext } from '../../../context/Cart.context.jsx';
import CartItem from './cart-item/CartItem.component.jsx';

import './cartContainer.styles.css';

const CartContainer = () => {
    const cartContextValue = useContext(CartContext);

    return (
        <ul className="cart-container">
            {cartContextValue.cartState.cart.map((cart, key) => {
                return <CartItem id={cart.bookID._id} price={cart.bookID.price} bookCover={cart.bookID.bookCover} title={cart.bookID.title} key={key} />
            })}
        </ul>
    );
};

export default CartContainer;