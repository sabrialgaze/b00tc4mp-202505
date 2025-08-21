import express, { Router } from 'express'
import { logic } from '../logic/index.js'
import jwt from 'jsonwebtoken'

export const posts = Router()

const jsonBodyParser = express.json()

posts.post('/', jsonBodyParser, (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        const payload = jwt.verify(token, 'ilovecheesetooat3am')

        const { sub: userId } = payload

        const { image, text } = req.body

        logic.createPost(userId, image, text)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

posts.get('/all', (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        const payload = jwt.verify(token, 'ilovecheesetooat3am')

        const { sub: userId } = payload

        logic.getPosts(userId)
            .then(posts => res.status(200).json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

posts.delete('/:postId', (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        const payload = jwt.verify(token, 'ilovecheesetooat3am')

        const { sub: userId } = payload

        const { postId } = req.params

        logic.removePost(userId, postId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

posts.patch('/:postId/likes', (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        const payload = jwt.verify(token, 'ilovecheesetooat3am')

        const { sub: userId } = payload

        const { postId } = req.params

        logic.toggleLikePost(userId, postId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

posts.patch('/:postId/saved', (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        const payload = jwt.verify(token, 'ilovecheesetooat3am')

        const { sub: userId } = payload

        const { postId } = req.params

        logic.toggleSavePost(userId, postId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

posts.patch('/:postId/archived', (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        const payload = jwt.verify(token, 'ilovecheesetooat3am')

        const { sub: userId } = payload

        const { postId } = req.params

        logic.toggleArchivePost(userId, postId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

posts.get('/saved', (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        const payload = jwt.verify(token, 'ilovecheesetooat3am')

        const { sub: userId } = payload

        logic.getSavedPosts(userId)
            .then(posts => res.status(200).json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

posts.get('/archived', (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        const payload = jwt.verify(token, 'ilovecheesetooat3am')

        const { sub: userId } = payload

        logic.getArchivedPosts(userId)
            .then(posts => res.status(200).json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

posts.get('/liked', (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        const payload = jwt.verify(token, 'ilovecheesetooat3am')

        const { sub: userId } = payload

        logic.getLikedPosts(userId)
            .then(posts => res.status(200).json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

posts.get('/', (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        const payload = jwt.verify(token, 'ilovecheesetooat3am')

        const { sub: userId } = payload

        const { q: query } = req.query

        logic.searchPosts(userId, query)
            .then(posts => res.status(200).json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})