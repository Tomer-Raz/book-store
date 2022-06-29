import express from "express"

import * as UserController from '../controllers/user.controller.js'
import userAuth from "../middlewares/user.auth.js";

const router = new express.Router();

router.post('/users/new', UserController.createUser)

router.post('/users/login', UserController.login)

router.post('/users/logout', userAuth, UserController.logout)

export default router;