import React from "react";
import './card.styles.css'
import environments from '../../environments/environments.js'
import { useEffect } from "react";
import { BooksContext } from "../../context/Books.context";
import { initBooksAction } from "../../actions/books.actions";
import { useContext } from "react";
import CardChild from "../cardChild/cardChild.component";


const Card = () => {
    const API_URL = environments.API_URL;
    const booksContextValue = useContext(BooksContext);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await fetch(`${API_URL}/books/`)

                if (!response.ok) {
                    throw new Error();
                }
                const payload = await response.json()
                const books = payload.data

                const action = initBooksAction(books)
                booksContextValue.dispatchBooksState(action)
            } catch (err) {
                alert("something went wrong")
            }
        }
        getBooks();
    }, [])

    return (
        <div className="cards">
            {booksContextValue.booksState.length === 0 ? <div className="empty-list">Your list is empty</div>
                : booksContextValue.booksState.map((book, index) => {
                    return <CardChild
                        id={book._id}
                        title={book.title}
                        bookCover={book.bookCover}
                        author={book.author}
                        pages={book.pages}
                        price={book.price}
                        description={book.description}
                        key={index} />
                })}
        </div>
    )
}

export default Card;