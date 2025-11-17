import express, { Router } from 'express'
import { logic } from '../logic/index.js'
import jwt from 'jsonwebtoken'

export const payments = Router()

const jsonBodyParser = express.json()

payments.post('/', jsonBodyParser, (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { sub: playerId } = payload
        const { groupId, service } = req.body

        logic.createPayment(playerId, groupId, service)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

payments.get('/player', (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { sub: playerId } = payload

        logic.getPaymentsForPlayer(playerId)
            .then(payments => res.status(200).json(payments))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

payments.get('/coach', (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { sub: coachId } = payload

        logic.getPaymentsForCoach(coachId)
            .then(payments => res.status(200).json(payments))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})