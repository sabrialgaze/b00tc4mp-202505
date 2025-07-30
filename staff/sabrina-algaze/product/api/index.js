import express from 'express'
import cors from 'cors'
import { logic } from './logic/index.js'
import { DuplicityError, ValidationError, NotFoundError, OwnershipError, CredentialsError } from 'com'

const api = express()

const jsonBodyParser = express.json()

api.use(cors())

api.get('/', (req, res) => res.send('Hello API'))

api.post('/users', jsonBodyParser, (req, res, next) => {
    const { name, email, username, password } = req.body

    try {
        logic.registerUser(name, email, username, password)

        res.status(201).send()
    } catch (error) {
        next(error)
    }
})

api.post('/users/auth', jsonBodyParser, (req, res, next) => {
    const { username, password } = req.body

    try {
        const userId = logic.authenticateUser(username, password)

        res.status(200).json(userId)
    } catch (error) {
        next(error)
    }
})

api.get('/users/info', (req, res, next) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const user = logic.getUserInfo(userId)

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

api.post('/posts', jsonBodyParser, (req, res, next) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const { image, text } = req.body

        logic.createPost(userId, image, text)

        res.status(201).send()
    } catch (error) {
        next(error)
    }
})

api.get('/posts', (req, res, next) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const posts = logic.getPosts(userId)

        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
})

api.delete('/posts/:postId', (req, res, next) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const { postId } = req.params

        logic.removePost(userId, postId)

        res.status(204).send()
    } catch (error) {
        next(error)
    }
})

api.patch('/posts/:postId/likes', (req, res, next) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const { postId } = req.params

        logic.toggleLikePost(userId, postId)

        res.status(204).send()
    } catch (error) {
        next(error)
    }
})

api.patch('/posts/:postId/saved', (req, res, next) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const { postId } = req.params

        logic.toggleSavePost(userId, postId)

        res.status(204).send()
    } catch (error) {
        next(error)
    }
})

api.patch('/posts/:postId/archived', (req, res, next) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const { postId } = req.params

        logic.toggleArchivePost(userId, postId)

        res.status(204).send()
    } catch (error) {
        next(error)
    }
})

api.get('/posts/saved', (req, res, next) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const posts = logic.getSavedPosts(userId)

        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
})

api.get('/posts/archived', (req, res, next) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const posts = logic.getArchivedPosts(userId)

        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
})

api.get('/posts/liked', (req, res, next) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const posts = logic.getLikedPosts(userId)

        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
})

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

