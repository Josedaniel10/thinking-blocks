import express from 'express'
import errorHandler from './middlewares/errorHandler.js'

const app = express()

app.use(express.json())

app.get('/', (_req, res)=> {
    res.send('Hola mundo')
})

app.use(errorHandler)

export default app