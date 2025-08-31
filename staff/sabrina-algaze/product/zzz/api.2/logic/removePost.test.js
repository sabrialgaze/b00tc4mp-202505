import mongoose from 'mongoose'
import { removePost } from './removePost.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        return removePost('6894a5f3691146bd106709f3', '6894a6df135d79d69037f96a')
    })
    .catch(error => console.error(error))