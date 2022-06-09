import React, { useState, useEffect } from "react";
import './cart.styles.css'
import Loader from "../../components/loader/loader.component";

const Cart = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])

    return isLoading ? (<Loader />) : (
        <div className="cart-page">
            <div className="cart-container">
                <h1 id="cart-text">Whoops, Looks like your cart is empty.</h1>
            </div>
        </div>
    )
}

export default Cart;