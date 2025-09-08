import mongoose from 'mongoose'
import { registerUser } from './registerUser.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        return registerUser('Peter Pan', 'peter@pan.com', 'peterpan', 'peter123')
    })
    .then(() => {
        return registerUser('Wendy Darling', 'wendy@darling.com', 'wendydarling', 'wendy123')
    })
    .then(() => {
        return registerUser('James Hook', 'james@hook.com', 'jameshook', 'james123')
    })
    .catch(error => console.error(error))