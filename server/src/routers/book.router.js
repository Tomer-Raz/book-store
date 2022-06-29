import express from 'express'
import * as bookController from '../controllers/book.controller.js'

const router = new express.Router()

// router.post('/books/new', bookController.createBook)

router.get('/books/:bookID', bookController.getBook)

router.get('/books', bookController.getAllBooks)

// router.delete('/books/:bookID', bookController.deleteBook)

export default router;