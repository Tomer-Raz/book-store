import Book from "../models/book.model.js";
import { SuccessResponse, ErrorResponse } from "../models/response.model.js";


export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).send(new SuccessResponse(200,"Ok",books,""))
        
    } catch (err) {

        res.status(500).send(new ErrorResponse(500, "Internal server error", ""))
        
    }
}

export const getBook = async (req, res) => {
    const bookID = req.params.bookID
    try {
        const book = await Book.findById(bookID);
        res.status(200).send(new SuccessResponse(200, "Ok", book, ""))

    } catch (err) {

        res.status(500).send(new ErrorResponse(500, "Internal server error", ""))

    }
}

// export const createBook = async (req, res) => {
//     const data = req.body
//     const book = new Book(data);

//     try {
//         await book.save();

//         res.status(201).send({
//             status: 201,
//             statusText: "created",
//             data: book,
//             message: 'Book Created!'
//         })

//     } catch (err) {
//         res.status(400).send({
//             status: 400,
//             statusText: "Bad request",
//             message: '',
//         })
//     }
// }

// export const deleteBook = async (req, res) => {
    //     const bookID = req.params.bookID

    //     try {
        //         await Book.findByIdAndDelete(bookID)
        //         res.send({
            //             status: 200,
            //             statusText: "Ok",
            //             data: {},
            //             message: "Book Deleted Successfully!"
            //         })
            
            //     } catch (err) {
                //         res.status(500).send({
                    //             status: 500,
                    //             statusText: "Internal server error",
                    //             message: '',
                    //         })
                    //     }
                    // }