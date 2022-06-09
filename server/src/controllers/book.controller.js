import Book from "../models/book.model.js";

export const createBook = async (req, res) => {
    const data = req.body
    const book = new Book(data);

    try {
        await book.save();

        res.status(201).send({
            status: 201,
            statusText: "created",
            data: book,
            message: 'Book Created!'
        })

    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: '',
        })
    }
}

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.send({
            status: 200,
            statusText: 'ok',
            data: books,
            message: ''
        })


    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: '',
        })
    }
}

export const getBook = async (req, res) => {
    const bookID = req.params.bookID
    try {
        const book = await Book.findById(bookID);
        res.send({
            status: 200,
            statusText: 'ok',
            data: book,
            message: ''
        })
    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: '',
        })
    }
}

export const deleteBook = async (req, res) => {
    const bookID = req.params.bookID

    try {
        await Book.findByIdAndDelete(bookID)
        res.send({
            status: 200,
            statusText: "Ok",
            data: {},
            message: "Book Deleted Successfully!"
        })

    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: '',
        })
    }
}