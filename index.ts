import express from 'express'
import mongoose from 'mongoose'
import { jwt } from './src/security/AuthMiddleware'
import errorHandler from "./src/error/errorsMiddleware";
import usersRouter from "./src/controller/UserController";
import authRouter from "./src/controller/AuthController";


mongoose.connect('mongodb://root:root@mongo:27017/universal_studios')

const app = express()

app.use(express.json())
app.use(jwt())
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/users', usersRouter)
app.use('/auth', authRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
