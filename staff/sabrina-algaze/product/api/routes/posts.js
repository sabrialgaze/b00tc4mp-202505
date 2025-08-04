import express, { Router } from 'express'
import { logic } from '../logic/index.js'

export const posts = Router()

const jsonBodyParser = express.json()

posts.post('/', jsonBodyParser, (req, res, next) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const { image, text } = req.body

        logic.createPost(userId, image, text)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

posts.get('/', (req, res, next) => {
    try {
        const userId = req.headers.authorization.slice(6)

        logic.getPosts(userId)
            .then(posts => res.status(200).json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

posts.delete('/:postId', (req, res, next) => {
    try {
        const userId = req.headers.authorization.slice(6)

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
        const userId = req.headers.authorization.slice(6)

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
        const userId = req.headers.authorization.slice(6)

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
        const userId = req.headers.authorization.slice(6)

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
        const userId = req.headers.authorization.slice(6)

        logic.getSavedPosts(userId)
            .then(posts => res.status(200).json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

posts.get('/archived', (req, res, next) => {
    try {
        const userId = req.headers.authorization.slice(6)

        logic.getArchivedPosts(userId)
            .then(posts => res.status(200).json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

posts.get('/liked', (req, res, next) => {
    try {
        const userId = req.headers.authorization.slice(6)

        logic.getLikedPosts(userId)
            .then(posts => res.status(200).json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

