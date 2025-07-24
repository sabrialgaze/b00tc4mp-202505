import express from 'express'
import cors from 'cors'
import { logic } from './logic/index.js'

const api = express()

const jsonBodyParser = express.json()

api.use(cors())

api.get('/', (req, res) => res.send('Hello API'))

api.post('/users', jsonBodyParser, (req, res) => {
    const { name, email, username, password } = req.body

    try {
        logic.registerUser(name, email, username, password)

        res.status(201).send()
    } catch (error) {
        console.error(error)

        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.post('/users/auth', jsonBodyParser, (req, res) => {
    const { username, password } = req.body

    try {
        const userId = logic.authenticateUser(username, password)

        res.status(200).json(userId)
    } catch (error) {
        console.error(error)

        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/users/info', (req, res) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const user = logic.getUserInfo(userId)

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.post('/posts', jsonBodyParser, (req, res) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const { image, text } = req.body

        logic.createPost(userId, image, text)

        res.status(201).send()
    } catch (error) {
        console.error(error)

        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/posts', (req, res) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const posts = logic.getPosts(userId)

        res.status(200).json(posts)
    } catch (error) {
        console.error(error)

        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.delete('/posts/:postId', (req, res) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const { postId } = req.params

        logic.removePost(userId, postId)

        res.status(204).send()
    } catch (error) {
        console.error(error)

        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.patch('/posts/:postId/likes', (req, res) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const { postId } = req.params

        logic.toggleLikePost(userId, postId)

        res.status(204).send()
    } catch (error) {
        console.error(error)

        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.patch('/posts/:postId/saved', (req, res) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const { postId } = req.params

        logic.toggleSavePost(userId, postId)

        res.status(204).send()
    } catch (error) {
        console.error(error)

        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.patch('/posts/:postId/archived', (req, res) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const { postId } = req.params

        logic.toggleArchivePost(userId, postId)

        res.status(204).send()
    } catch (error) {
        console.error(error)

        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/posts/saved', (req, res) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const posts = logic.getSavedPosts(userId)

        res.status(200).json(posts)
    } catch (error) {
        console.error(error)

        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/posts/archived', (req, res) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const posts = logic.getArchivedPosts(userId)

        res.status(200).json(posts)
    } catch (error) {
        console.error(error)

        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})


api.listen(8080, () => console.log('API listening on port 8080'))

