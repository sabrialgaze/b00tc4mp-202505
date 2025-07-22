import express from 'express'
import { logic } from './logic/index.js'

const api = express()

const jsonBodyParser = express.json()

api.get('/', (req, res) => res.send('Hello API'))

api.post('/users/register', jsonBodyParser, (req, res) => {
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

        res.status(200).json({ userId })
    } catch (error) {
        console.error(error)

        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.post('/users/info', jsonBodyParser, (req, res) => {
    const { userId } = req.body

    try {
        const user = logic.getUserInfo(userId)

        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.post('/posts/create', jsonBodyParser, (req, res) => {
    const { image, text, userId } = req.body

    try {
        logic.createPost(image, text, userId)

        res.status(201).send()
    } catch (error) {
        console.error(error)

        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.listen(8080, () => console.log('API listening on port 8080'))

