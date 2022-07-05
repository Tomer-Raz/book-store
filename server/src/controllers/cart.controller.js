import Cart from "../models/cart.model.js";
import { ErrorResponse, SuccessResponse } from "../models/response.model.js";

export const getCart = async (req, res) => {
    const user = req.user;
    try {
        const cart = await Cart.findOne({ 'ownerID': user._id });
        await cart.populate('books.bookID');

        res.status(200).send(new SuccessResponse(200, 'Ok', cart, ""))

    } catch (err) {
        res.status(500).send(new ErrorResponse(500, "Internal server error", ""))
    }
}

export const addBookToCart = async (req, res) => {
    const user = req.user;
    const data = req.body;

    try {
        const cart = await Cart.findOne({ 'ownerID': user._id });
        cart.books.push({ bookID: data.bookID })
        await cart.save()

        res.status(201).send(new SuccessResponse(201, 'Created', cart, "Book added to cart!"))


    } catch (err) {

        res.status(500).send(new ErrorResponse(500, "Internal server error", ""))

    }
}

export const removeFromCart = async (req, res) => {
    const user = req.user;
    const data = req.body.bookID;

    try {
        const cart = await Cart.findOne({ 'ownerID': user._id });
        const index = cart.books.findIndex(object => {
            return object.bookID.toString() === data;
        })
        cart.books.splice(index, 1)

        await cart.save()
        res.status(200).send(new SuccessResponse(200, 'Ok', cart, "Book removed from cart"))

    } catch (err) {

        res.status(500).send(new ErrorResponse(500, "Internal server error", ""))
    }
}

export const checkout = async (req, res) => {
    const user = req.user;

    try {
        const cart = await Cart.findOne({ 'ownerID': user._id });
        cart.books = []

        await cart.save()

        res.status(200).send(new SuccessResponse(200, 'Ok', cart, "Checkout Completed!"))

    } catch (err) {

        res.status(500).send(new ErrorResponse(500, "Internal server error", ""))

    }
}