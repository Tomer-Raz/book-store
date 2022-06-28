import { createContext, useReducer } from 'react';

import booksReducer, { BOOKS_INITIAL_STATE } from '../reducers/books.reducer.js';

export const BooksContext = createContext();

const BooksContextProvider = (props) => {
    const [booksState, dispatchBooksState] = useReducer(booksReducer, BOOKS_INITIAL_STATE);

    const value = {
        booksState: booksState,
        dispatchBooksState: dispatchBooksState,
    };

    return <BooksContext.Provider value={value}>{props.children}</BooksContext.Provider>;
};

export default BooksContextProvider;