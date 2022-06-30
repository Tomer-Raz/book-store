import React, { useEffect, useState } from "react";
import './cardContainer.styles.css'
import Card from "./card/Card.component";
import Loader from "../../../components/loader/Loader.component";
import { getAllBooks } from "../../../services/book.service";
import { ERROR_MESSAGE, LOADER_TIMEOUT } from "../../../constants/constants";

const CardContainer = () => {
    const [booksState, setBooksState] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const { data: books } = await getAllBooks()
                setBooksState(books)

                setTimeout(() => {
                    setIsLoading(false);
                }, LOADER_TIMEOUT);

            } catch (err) {
                alert(ERROR_MESSAGE)
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
                        key={index} />
                })}
        </div>
    )
}

export default CardContainer;