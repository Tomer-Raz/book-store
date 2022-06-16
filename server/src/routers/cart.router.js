import express from 'express'
import * as cartController from '../controllers/cart.controller.js'
import userAuth from '../middlewares/user.auth.js'

const router3 = new express.Router()

router3.get('/cart', userAuth, cartController.getCart)

router3.post('/cart/add-to-cart', userAuth, cartController.addBookToCart)

router3.delete('/cart/checkout', userAuth, cartController.checkout)

router3.delete('/cart', userAuth, cartController.removeFromCart)

export default router3;