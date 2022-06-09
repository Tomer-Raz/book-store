import express from "express"

import * as UserController from '../controllers/user.controller.js'

const router2 = new express.Router();

router2.post('/users/new', UserController.createUser)

router2.get('/users', UserController.getAllUsers)

router2.get('/users/:userID', UserController.getUser)

router2.delete('/users/:userID', UserController.deleteUser)

router2.post('/users/login', UserController.login)


export default router2;