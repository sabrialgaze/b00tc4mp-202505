import express, { Router } from 'express'
import { logic } from '../logic/index.js'

export const users = Router()

const jsonBodyParser = express.json()

users.post('/', jsonBodyParser, (req, res, next) => {
    try {
        const { name, email, username, password } = req.body

        logic.registerUser(name, email, username, password)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

users.post('/auth', jsonBodyParser, (req, res, next) => {
    try {
        const { username, password } = req.body

        logic.authenticateUser(username, password)
            .then(userId => res.status(200).json(userId))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

users.get('/info', (req, res, next) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const user = logic.getUserInfo(userId)

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

