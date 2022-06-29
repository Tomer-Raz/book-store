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
        min: 1,
        required: [true, 'number of pages is required']
    },
    price: {
        type: Number,
        min: 0,
        required: [true, 'price is required']
    },
    bookCover: {
        type: String,
        trim: true,
        required: [true, 'image is required'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
})

bookSchema.methods.toJSON = function () {
    const book = this;
    const bookObj = book.toObject();
    delete bookObj.__v;

    return bookObj;
};



const Book = mongoose.model('Book', bookSchema)

export default Book;