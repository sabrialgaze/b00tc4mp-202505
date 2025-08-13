import mongoose from 'mongoose'
import { toggleSavePost } from './toggleSavePost.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        return toggleSavePost('6894a5f3691146bd106709f3', '6894af52375eec6947459bb8')
    })
    .catch(error => console.error(error))