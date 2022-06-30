import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './cart.styles.css'

import Loader from "../../components/loader/Loader.component";
import CartContainer from "./cart-container/CartContainer.component";

import { AuthContext } from "../../context/Auth.context";
import { CartContext } from "../../context/Cart.context";

import { checkoutAction, initialCartAction } from "../../actions/cart.actions";
import { ERROR_MESSAGE, LOADER_TIMEOUT } from "../../constants/constants";
import { getCart, cartCheckout } from "../../services/cart.service";

const Cart = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)
    const { userToken } = useContext(AuthContext)
    const { cartState: { cart, price }, dispatchCartState } = useContext(CartContext)

    const handleCheckout = async () => {
        try {
            const { message } = await cartCheckout(userToken)

            alert(message)
            dispatchCartState(checkoutAction());
            navigate('/');

        } catch (err) {
            alert(ERROR_MESSAGE)
        };
    }

    useEffect(() => {
        const checkCart = async () => {
            try {
                const { data: { books } } = await getCart(userToken)

                const action = initialCartAction(books)
                dispatchCartState(action);

                setTimeout(() => {
                    setIsLoading(false)
                }, LOADER_TIMEOUT)

            } catch (err) {
                console.log(err);
            };
        }
        checkCart();

        if (!userToken) {
            navigate('/')
        }

    }, [])

    return isLoading ? (<Loader />) :
        cart.length === 0 ? (
            <div className="cart-page empty">
                <h1 id="empty-cart-text">Your Cart is empty</h1>
            </div>

        ) : (
            <div className="cart-page">
                <CartContainer />
                <h3 id="total-price">Your Total Is: {price}$</h3>
                <button type="button" id="checkout-button" onClick={handleCheckout}>Checkout</button>
            </div>
        )
}

export default Cart;