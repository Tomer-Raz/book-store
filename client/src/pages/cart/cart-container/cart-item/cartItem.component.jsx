import React, { useContext } from 'react';
import { CartContext } from '../../../../context/Cart.context';
import { AuthContext } from '../../../../context/Auth.context'
import environments from '../../../../environments/environments';

import { removeCartAction } from '../../../../actions/cart.actions';

import './cartItem.styles.css';

const CartItem = (props) => {
    const cartContextValue = useContext(CartContext)
    const authContextValue = useContext(AuthContext)
    const API_URL = environments.API_URL;

    const handleDeleteBook = async () => {
        const data = { 'bookID': props.id };
        try {
            const response = await fetch(`${API_URL}/cart/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${authContextValue.userToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (response.status !== 200) {
                throw new Error();
            }


            //dispatch reducer
            const action = removeCartAction(props.id)
            cartContextValue.dispatchCartState(action);

            const responseObj = await response.json();
            alert(responseObj.message)

        } catch (err) {
            alert('Something went wrong')
        }
    }

    return (
        <div className='cart-item-container'>
            <img id="book-img-cart" src={props.bookCover} />
            <div className="book-details">
                <h3 id="book-title-cart">{props.title}</h3>
                <h5 id="book-price-cart">{props.price}$</h5>
                <button type='button' id='book-button-cart' onClick={handleDeleteBook}>Remove</button>
            </div>
        </div >
    )
}
export default CartItem;
