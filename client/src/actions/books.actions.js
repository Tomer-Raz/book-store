const booksActionTypes = {
    INIT_BOOKS: 'INIT_BOOKS',
};

const { INIT_BOOKS } = booksActionTypes

export const initBooksAction = (books) => {
    const action = {
        type: INIT_BOOKS,
        payload: {
            books: books,
        },
    };

    return action;
};


export default booksActionTypes;