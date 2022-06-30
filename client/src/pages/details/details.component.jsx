import React, { useState, useEffect, useContext } from "react";
import './details.styles.css'
import Loader from "../../components/loader/Loader.component";
import { useParams, Link } from "react-router-dom";
import { CartContext } from '../../context/Cart.context';
import { AuthContext } from "../../context/Auth.context";
import { addToCartAction } from "../../actions/cart.actions";
import { ERROR_MESSAGE, LOADER_TIMEOUT } from "../../constants/constants";
import { getBookByID } from "../../services/book.service";
import { addToCart } from "../../services/cart.service";

const Details = () => {

    const { userToken } = useContext(AuthContext)
    const { cartState, dispatchCartState } = useContext(CartContext)

    let { bookID } = useParams();

    const [isLoading, setIsLoading] = useState(true)
    const [isBookInCart, setIsBookInCart] = useState(false)
    const [book, setBook] = useState("")
    const { title, bookCover, author, pages, price, description } = book

    const handleAddBook = async () => {
        const data = { 'bookID': bookID };
        try {
            const { message } = await addToCart(userToken, data)

            const action = addToCartAction(bookID)
            dispatchCartState(action);

            alert(message)
            setIsBookInCart(true)

        } catch (err) {
            alert(ERROR_MESSAGE)
            console.log(err);
        }
    }

    useEffect(() => {
        const getBook = async () => {
            try {
                const { data: book } = await getBookByID(bookID);
                setBook(book);

                setTimeout(() => {
                    setIsLoading(false);
                }, LOADER_TIMEOUT);
            } catch (err) {
                alert(ERROR_MESSAGE)
            }
        }
        getBook();

        if (userToken) {
            const { cart } = cartState
            cart.find(element => element.bookID._id === bookID || element.bookID === bookID ? setIsBookInCart(true) : null);
        }
    }, [])


    return isLoading ? (<Loader />) : (
        <div className="details-page">
            <div className="details-container">
                <img id="details-img" alt={title} src={bookCover}></img>
                <div>
                    <h3 id="details-title">{title}</h3>
                    <h4 id="details-info">Author: {author}</h4>
                    <h4 id="details-info">Pages: {pages}</h4>
                    <h4 id="details-info">Price: {price}$</h4>
                    <div>
                        <h5 id="details-description-title">Description:</h5>
                        <h4 id="details-description">{description}</h4>
                    </div>

                    {userToken ? isBookInCart === false ? <button className="details-cart-button" onClick={handleAddBook}>Add To Cart</button> : null : null}

                    <Link to="/">
                        <button className="details-cart-button home">Home</button>
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default Details