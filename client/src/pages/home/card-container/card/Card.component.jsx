import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../../../context/Cart.context';
import { AuthContext } from "../../../../context/Auth.context";
import { addToCartAction } from "../../../../actions/cart.actions";
import { addToCart } from "../../../../services/cart.service";

import './card.styles.css'
import { ERROR_MESSAGE } from "../../../../constants/constants";

const Card = (props) => {

    const navigate = useNavigate();
    const { id, price, bookCover, title, author, pages } = props
    const { userToken } = useContext(AuthContext)
    const { cartState, dispatchCartState } = useContext(CartContext)
    const [isBookInCart, setIsBookInCart] = useState(false)


    const handleAddBook = async () => {
        const data = { 'bookID': id };
        try {
            const { message } = await addToCart(userToken, data)

            const action = addToCartAction(id)
            dispatchCartState(action);

            alert(message)
            setIsBookInCart(true)

        } catch (err) {
            alert(ERROR_MESSAGE)
            console.log(err);
        }
    }

    const navigateToDetails = () => {
        navigate(`book/${id}`)
    }

    useEffect(() => {
        if (userToken) {
            const { cart } = cartState;
            cart.forEach(element => element.bookID._id === id ? setIsBookInCart(true) : null);
        }

    }, [])

    return (
        <div className="card" >
            <div onClick={navigateToDetails}>
                <img id="book-img" alt={title} src={bookCover}></img>
                <div className="card-details">
                    <h3 id="book-title">{title}</h3>
                    <h4 id="book-author">Author: {author}</h4>
                    <h4 id="book-pages">Pages: {pages}</h4>
                    <h4 id="book-price">Price: {price}$</h4>
                </div>
            </div>

            {isBookInCart === false ? !userToken ? null :
                <button id="add-to-cart-btn" onClick={handleAddBook}>Add To Cart</button> :
                <button id="book-in-cart-btn" disabled>Book Is In Cart</button>}

        </div>
    )
}

export default Card