import React, { useEffect, useState } from "react";
import './cardContainer.styles.css'
import environments from '../../../environments/environments.js'
import Card from "./card/Card.component";
import Loader from "../../../components/loader/Loader.component";

const CardContainer = () => {
    const API_URL = environments.API_URL;
    const [booksState, setBooksState] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await fetch(`${API_URL}/books/`)

                if (!response.ok) {
                    throw new Error();
                }
                const payload = await response.json()
                const books = payload.data
                setBooksState(books)
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);

            } catch (err) {
                alert("something went wrong")
            }
        }
        getBooks();
    }, [])

    return isLoading ? (<Loader />) : (
        <div className="cards">
            {booksState.length === 0 ? <div className="empty-list">Whoops, no books found</div>
                : booksState.map((book, index) => {
                    return <Card
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

export default CardContainer;