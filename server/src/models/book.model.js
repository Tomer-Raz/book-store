import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'title is required'],
    },
    author: {
        type: String,
        trim: true,
        required: [true, 'author is required'],
    },
    pages: {
        type: Number,
        required: [true, 'number of pages is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    image: {
        type: String,
        trim: true,
        required: [true, 'image is required'],
    },
})

const Book = mongoose.model('Book', bookSchema)

export default Book;