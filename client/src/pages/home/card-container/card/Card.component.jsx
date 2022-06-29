import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import environments from "../../../../environments/environments.js";
import { CartContext } from '../../../../context/Cart.context';
import { AuthContext } from "../../../../context/Auth.context";
import { addToCartAction } from "../../../../actions/cart.actions";
import Loader from "../../../../components/loader/Loader.component";

import './card.styles.css'

const Card = (props) => {
    const navigate = useNavigate();
    const API_URL = environments.API_URL;
    const authContextValue = useContext(AuthContext)
    const cartContextValue = useContext(CartContext)
    const [isBookInCart, setIsBookInCart] = useState(false)
    const [isFetchFinished, setIsFetchFinished] = useState(false);

    const handleAddBook = async () => {
        const data = { 'bookID': props.id };
        try {
            const response = await fetch(`${API_URL}/cart/add-to-cart`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authContextValue.userToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (response.status !== 201) {
                throw new Error();
            }

            //dispatch reducer
            const action = addToCartAction(props.id)
            cartContextValue.dispatchCartState(action);

            const responseObj = await response.json();
            alert(responseObj.message)
            setIsBookInCart(true)

        } catch (err) {
            alert('Whoops, something went wrong')
            console.log(err);
        }
    }

    const navigateToDetails = () => {
        navigate(`book/${props.id}`)
    }

    useEffect(() => {
        if (authContextValue.userToken) {
            const checkCart = async () => {
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
                    cart.forEach(element => element.bookID._id === props.id ? setIsBookInCart(true) : null);
                    setIsFetchFinished(true)

                } catch (err) {
                    console.log(err);
                };
            }
            checkCart();
        }
    }, [])

    if (authContextValue.userToken && !isFetchFinished) { return <Loader /> }

    return (
        <div className="card" >
            <div onClick={navigateToDetails}>
                <img id="book-img" alt={props.title} src={props.bookCover}></img>
                <div className="card-details">
                    <h3 id="book-title">{props.title}</h3>
                    <h4 id="book-author">Author: {props.author}</h4>
                    <h4 id="book-pages">Pages: {props.pages}</h4>
                    <h4 id="book-price">Price: {props.price}$</h4>
                </div>
            </div>

            {isBookInCart === false ? !authContextValue.userToken ? null :
                <button id="add-to-cart-btn" onClick={handleAddBook}>Add To Cart</button> :
                <button id="book-in-cart-btn" disabled>Book Is In Cart</button>}

        </div>
    )
}

export default Card