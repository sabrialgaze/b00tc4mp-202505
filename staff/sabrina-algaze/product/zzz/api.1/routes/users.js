import express, { Router } from 'express'
import { logic } from '../logic/index.js'
import jwt from 'jsonwebtoken'

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
            .then(userId => {
                const token = jwt.sign({ sub: userId }, 'ilovecheesetooat3am')

                res.status(200).json(token)
            })
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

users.get('/info', (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        const payload = jwt.verify(token, 'ilovecheesetooat3am')

        const { sub: userId } = payload

        logic.getUserInfo(userId)
            .then(user => res.status(200).json(user))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

