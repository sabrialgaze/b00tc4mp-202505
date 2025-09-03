import mongoose from 'mongoose'
import { registerUser } from './registerUser.js'

mongoose.connect('mongodb://127.0.0.1:27017/project')
    .then(() => {
        return registerUser('Sabrina Algaze', 'sabrina@algaze.com', 'sabrina123')
    })
    .then(() => {
        return registerUser('Laura Romano', 'laura@romano.com', 'laura123')
    })
    .then(() => {
        return registerUser('Juan Carlos', 'juan@carlos.com', 'juan123')
    })
    .catch(error => console.error(error))