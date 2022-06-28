import booksActionTypes from '../actions/books.actions.js';

export const BOOKS_INITIAL_STATE = [];

const booksReducer = (state, action) => {

    switch (action.type) {
        case booksActionTypes.INIT_BOOKS: {
            const books = action.payload.books;
            const updatedState = books;

            return updatedState;
        }
        default:
            return state;
    }
};


export default booksReducer;