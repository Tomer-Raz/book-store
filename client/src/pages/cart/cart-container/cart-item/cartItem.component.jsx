import React, { useContext } from 'react';
import { CartContext } from '../../../../context/Cart.context';
import { AuthContext } from '../../../../context/Auth.context'
import { removeCartAction } from '../../../../actions/cart.actions';
import { removeBookFromCart } from '../../../../services/cart.service';

import './cartItem.styles.css';
import { ERROR_MESSAGE } from '../../../../constants/constants';

const CartItem = (props) => {
    const { id, price, bookCover, title } = props
    const { dispatchCartState } = useContext(CartContext)
    const { userToken } = useContext(AuthContext)

    const handleDeleteBook = async () => {
        const data = { 'bookID': id };
        try {
            const { message } = await removeBookFromCart(userToken, data)

            const action = removeCartAction(id)
            dispatchCartState(action);

            alert(message)

        } catch (err) {
            alert(ERROR_MESSAGE)
        }
    }

    return (
        <div className='cart-item-container'>
            <img id="book-img-cart" src={bookCover} />
            <div className="book-details">
                <h3 id="book-title-cart">{title}</h3>
                <h5 id="book-price-cart">{price}$</h5>
                <button type='button' id='book-button-cart' onClick={handleDeleteBook}>Remove</button>
            </div>
        </div >
    )
}
export default CartItem;
