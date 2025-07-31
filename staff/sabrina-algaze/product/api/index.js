import express from 'express'
import cors from 'cors'
import { DuplicityError, ValidationError, NotFoundError, OwnershipError, CredentialsError } from 'com'
import { users, posts } from './routes/index.js'

const api = express()

api.use(cors())

api.get('/', (req, res) => res.send('Hello API'))

api.use('/users', users)

api.use('/posts', posts)

api.use((error, req, res, next) => {
    console.error(error)

    let status = 500

    if (error instanceof ValidationError)
        status = 400
    else if (error instanceof NotFoundError)
        status = 404
    else if (error instanceof DuplicityError)
        status = 409
    else if (error instanceof OwnershipError)
        status = 406
    else if (error instanceof CredentialsError)
        status = 401

    res.status(status).json({ error: error.constructor.name, message: error.message })
})

api.listen(8080, () => console.log('API listening on port 8080'))

