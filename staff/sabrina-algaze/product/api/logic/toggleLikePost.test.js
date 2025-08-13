import mongoose from 'mongoose'
import { toggleLikePost } from './toggleLikePost.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        return toggleLikePost('6894a5f3691146bd106709f3', '6894af52375eec6947459bb8')
    })
    .catch(error => console.error(error))