import express from 'express'
import * as cartController from '../controllers/cart.controller.js'
import userAuth from '../middlewares/user.auth.js'

const router = new express.Router()

router.get('/cart', userAuth, cartController.getCart)

router.post('/cart/add-to-cart', userAuth, cartController.addBookToCart)

router.put('/cart/checkout', userAuth, cartController.checkout)

router.patch('/cart', userAuth, cartController.removeFromCart)

export default router;