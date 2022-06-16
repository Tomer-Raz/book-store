import express from 'express'
import cors from 'cors'

import bookRouter from './routers/book.router.js'
import userRouter from './routers/user.router.js'
import cartRouter from './routers/cart.router.js'

import connectToMongoDB from './databases/mongoose.db.js'
import environments from '../config/environments.js';

const PORT = environments.PORT;

const app = express();

app.use(express.json())
app.use(cors())

app.use(bookRouter)
app.use(userRouter)
app.use(cartRouter)

app.listen(PORT, async () => {
    console.log("Server is running on port 3001!");
    await connectToMongoDB()
})