import express, { Router } from 'express'
import { logic } from '../logic/index.js'
import jwt from 'jsonwebtoken'

export const trainings = Router()

const jsonBodyParser = express.json()

trainings.post('/', jsonBodyParser, (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { sub: coachId } = payload
        const { groupId } = req.body

        logic.createTraining(coachId, groupId)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

trainings.get('/player', jsonBodyParser, (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { sub: playerId } = payload

        logic.getTrainingsForPlayer(playerId)
            .then(trainings => res.status(200).json(trainings))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

trainings.get('/coach', jsonBodyParser, (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { sub: coachId } = payload

        logic.getTrainingsForCoach(coachId)
            .then(trainings => res.status(200).json(trainings))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})
trainings.get('/:trainingId', jsonBodyParser, (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { sub: userId } = payload
        const { trainingId } = req.params

        logic.getTrainingInfo(userId, trainingId)
            .then(training => res.status(200).json(training))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

trainings.patch('/:trainingId/join', jsonBodyParser, (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { sub: userId } = payload
        const { trainingId } = req.params

        logic.toggleJoinTraining(userId, trainingId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})
