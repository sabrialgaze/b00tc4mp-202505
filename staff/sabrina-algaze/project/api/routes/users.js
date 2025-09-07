import express, { Router } from 'express'
import { logic } from '../logic/index.js'
import jwt from 'jsonwebtoken'

export const users = Router()

const jsonBodyParser = express.json()

users.post('/', jsonBodyParser, (req, res, next) => {
    try {
        const { name, email, password } = req.body

        logic.registerUser(name, email, password)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

users.post('/auth', jsonBodyParser, (req, res, next) => {
    try {
        const { email, password } = req.body

        logic.authenticateUser(email, password)
            .then(user => {
                const { id, role } = user

                const token = jwt.sign({ sub: id, role }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRATION
                })

                res.status(200).json(token)
            })
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

