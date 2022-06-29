import React, { useState, useEffect, useContext } from "react";
import './details.styles.css'
import Loader from "../../components/loader/Loader.component";
import { useParams, Link } from "react-router-dom";
import environments from "../../environments/environments.js";
import { CartContext } from '../../context/Cart.context';
import { AuthContext } from "../../context/Auth.context";
import { addToCartAction } from "../../actions/cart.actions";
import { initialCartAction } from "../../actions/cart.actions";

const Details = () => {

    const API_URL = environments.API_URL;
    const cartContextValue = useContext(CartContext)
    const authContextValue = useContext(AuthContext)

    let { bookID } = useParams();

    const [isLoading, setIsLoading] = useState(true)
    const [isBookInCart, setIsBookInCart] = useState(false)
    const [book, setBook] = useState("")
    const [isFetchFinished, setIsFetchFinished] = useState(false);

    const handleAddBook = async () => {
        const data = { 'bookID': bookID };
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
            const action = addToCartAction(bookID)
            cartContextValue.dispatchCartState(action);

            const responseObj = await response.json();
            alert(responseObj.message)
            setIsBookInCart(true)

        } catch (err) {
            alert('Something went wrong!!')
            console.log(err);
        }
    }


    useEffect(() => {
        const getBook = async () => {
            try {
                const response = await fetch(`${API_URL}/books/${bookID}`)

                if (!response.ok) {
                    throw new Error();
                }
                const payload = await response.json()
                const book = payload.data
                setBook(book);

            } catch (err) {
                alert("something went wrong")
            }
        }

        if (authContextValue.userToken) {
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
                    cart.forEach(element => element.bookID._id === bookID ? setIsBookInCart(true) : null);

                    const action = initialCartAction(cart);
                    cartContextValue.dispatchCartState(action);
                    setIsFetchFinished(true)

                } catch (err) {
                    console.log(err);
                };
            }
            getCart();
        }

        getBook();


        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])

    if (authContextValue.userToken) {
        if (!isFetchFinished) return <Loader />;
    }
    return isLoading ? (<Loader />) : (
        <div className="details-page">
            <div className="details-container">
                <img id="details-img" alt={book.title} src={book.bookCover}></img>
                <div>
                    <h3 id="details-title">{book.title}</h3>
                    <h4 id="details-info">Author: {book.author}</h4>
                    <h4 id="details-info">Pages: {book.pages}</h4>
                    <h4 id="details-info">Price: {book.price}$</h4>
                    <div>
                        <h5 id="details-description-title">Description:</h5>
                        <h4 id="details-description">{book.description}</h4>
                    </div>

                    {authContextValue.userToken ? isBookInCart === false ? <button className="details-cart-button" onClick={handleAddBook}>Add To Cart</button> : null : null}

                    <Link to="/">
                        <button className="details-cart-button home">Home</button>
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default Details