import mongoose from 'mongoose'
import { authenticateUser } from './authenticateUser.js'

mongoose.connect('mongodb://127.0.0.1:27017/project')
    .then(() => {
        return authenticateUser('sabrina@algaze.com', 'sabrina123')
    })
    .then(user => console.log(user.id))
    .catch(error => console.error(error))