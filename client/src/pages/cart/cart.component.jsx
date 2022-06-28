import React, { useState, useEffect } from "react";
import './cart.styles.css'
import Loader from "../../components/loader/loader.component";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth.context";
import { CartContext } from "../../context/Cart.context";
import environments from "../../environments/environments";
import { initialCartAction } from "../../actions/cart.actions";
import { checkoutAction } from "../../actions/cart.actions";
import CartContainer from "./cart-container/cartContainer.component";

const Cart = () => {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();
    const authContextValue = useContext(AuthContext)
    const cartContextValue = useContext(CartContext)
    const API_URL = environments.API_URL

    const handleCheckout = async () => {
        try {
            const response = await fetch(`${API_URL}/cart/checkout`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authContextValue.userToken}`,
                },
            });

            if (!response.ok) {
                throw new Error();
            }

            alert("Checkout Completed!")
            cartContextValue.dispatchCartState(checkoutAction());
            navigate('/');

        } catch (err) {
            alert("something went wrong!")
        };
    }

    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await fetch(`${API_URL}/cart`, {
                    headers: {
                        'Authorization': `Bearer ${authContextValue.userToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error();
                }

                const responseObj = await response.json();
                const cart = responseObj.data.books;

                const action = initialCartAction(cart);
                cartContextValue.dispatchCartState(action);

            } catch (err) {
                navigate('/');
            };
        }

        if (!authContextValue.userToken) {
            navigate('/')
        }

        getCart();

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])

    return isLoading ? (<Loader />) :
        cartContextValue.cartState.cart.length === 0 ? (
            <div className="cart-page empty">
                <h1 id="empty-cart-text">Your Cart is empty</h1>
            </div>

        ) : (
            <div className="cart-page">
                <CartContainer />
                <h3 id="total-price">Your Total Is: {cartContextValue.cartState.price}$</h3>
                <button type="button" id="checkout-button" onClick={handleCheckout}>Checkout</button>
            </div>
        )
}

export default Cart;