import mongoose from 'mongoose'
import { authenticateUser } from './authenticateUser.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        return authenticateUser('peterpan', 'peter123')
    })
    .then(userId => console.log(userId))
    .catch(error => console.error(error))