const booksActionTypes = {
    INIT_BOOKS: 'INIT_BOOKS',
};

export const initBooksAction = (books) => {
    const action = {
        type: booksActionTypes.INIT_BOOKS,
        payload: {
            books: books,
        },
    };

    return action;
};


export default booksActionTypes;