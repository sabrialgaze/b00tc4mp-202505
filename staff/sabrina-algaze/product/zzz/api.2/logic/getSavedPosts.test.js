import mongoose from 'mongoose'
import { getSavedPosts } from './getSavedPosts.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        return getSavedPosts('6894a5f3691146bd106709f3')
    })
    .then((posts => console.log(posts)))
    .catch(error => console.error(error))