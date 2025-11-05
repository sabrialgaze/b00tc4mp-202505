import express, { Router } from 'express'
import { logic } from '../logic/index.js'
import jwt from 'jsonwebtoken'

export const groups = Router()

const jsonBodyParser = express.json()

groups.get('/player', jsonBodyParser, (req, res, next) => {
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

groups.get('/coach', jsonBodyParser, (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { sub: coachId } = payload

        logic.getGroupsForCoach(coachId)
            .then(groups => res.status(200).json(groups))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

groups.get('/:groupId/info', jsonBodyParser, (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { sub: coachId } = payload

        const { groupId } = req.params

        logic.getGroupInfoForCoach(coachId, groupId)
            .then(players => res.status(200).json(players))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

groups.patch('/:groupId/players/add', jsonBodyParser, (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { sub: coachId } = payload

        const { groupId } = req.params
        const { playerEmail } = req.body

        logic.addPlayerToGroup(coachId, groupId, playerEmail)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})