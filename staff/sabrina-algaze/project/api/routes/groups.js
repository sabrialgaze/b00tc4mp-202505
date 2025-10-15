import express, { Router } from 'express'
import { logic } from '../logic/index.js'
import jwt from 'jsonwebtoken'

export const groups = Router()

const jsonBodyParser = express.json()

groups.get('/', jsonBodyParser, (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { sub: playerId } = payload

        logic.getGroupsForPlayer(playerId)
            .then(groups => res.status(200).json(groups))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})